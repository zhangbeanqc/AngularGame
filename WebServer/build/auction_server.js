"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
var express = require("express");
var product_1 = require("./product");
var ws_1 = require("ws");
var path = require("path");
var app = express();
var categories = new Map([
    ['1', '軟件工具'],
    ['2', '硬件設備'],
    ['3', '電子產品']
]);
var products = [
    new product_1.Product(1, "第一個商品", 10.99, 3, "這是第一個商品", ["電子產品", "硬件設備"]),
    new product_1.Product(2, "第二個商品", 30.99, 4, "這是第二個商品", ["電子產品"]),
    new product_1.Product(3, "第三個商品", 15.99, 5, "這是第三個商品", ["硬件設備"]),
    new product_1.Product(4, "第四個商品", 70.99, 2.5, "這是第四個商品", ["硬件設備"]),
    new product_1.Product(5, "第五個商品", 110.99, 1.5, "這是第五個商品", ["軟件工具"]),
    new product_1.Product(6, "第六個商品", 22.99, 3.5, "這是第六個商品", ["軟件工具"])
];
var Comment = /** @class */ (function () {
    function Comment(id, productId, timestamp, user, rating, content) {
        this.id = id;
        this.productId = productId;
        this.timestamp = timestamp;
        this.user = user;
        this.rating = rating;
        this.content = content;
    }
    return Comment;
}());
exports.Comment = Comment;
var comments = [
    new Comment(1, 1, "2021-01-01T10:20:30.002Z", "User1", 2.5, "Not very impressive."),
    new Comment(3, 1, "2021-02-15T11:10:20.002Z", "User3", 4.5, "Good."),
    new Comment(2, 1, "2021-11-11T20:22:13.002Z", "User2", 3.5, "So so."),
    new Comment(4, 1, "2021-12-21T13:03:22.002Z", "User4", 4, "Like it."),
    new Comment(2, 3, "2021-02-11T20:22:10.241Z", "User2", 4, "Very good product!"),
    new Comment(3, 2, "2021-03-21T10:10:32.332Z", "User3", 3.5, "No comment!")
];
app.use('/', express.static(path.join(__dirname, '..', 'client')));
app.get('/api/', function (req, res) {
    res.send('Hello Express');
});
// app.get('/', (req, res) => {
//     res.redirect('/api/')
// });
app.get('/api/categories', function (req, res) {
    res.json(categories);
});
app.get('/api/products', function (req, res) {
    var result = products;
    var params = req.query;
    if (params.title) {
        result = result.filter(function (p) { return p.title.indexOf(params.title) != -1; });
    }
    if (params.price && result.length > 0) {
        result = result.filter(function (p) { return p.price <= parseInt(params.price); });
    }
    if (params.category && params.category != '-1' && result.length > 0) {
        result = result.filter(function (p) { return p.categories.indexOf(categories.get(params.category)) != -1; });
    }
    res.json(result);
});
app.get('/api/product/:id', function (req, res) {
    res.json(products.find(function (p) { return p.id == parseInt(req.params.id); }));
});
app.get('/api/product/:id/comments', function (req, res) {
    res.json(comments.filter(function (comment) { return comment.productId == parseInt(req.params.id); }));
});
var server = app.listen(8000, 'localhost', function () {
    console.log("Server is up, address: http://localhost:8000");
});
var subscription = new Map();
var wsServer = new ws_1.Server({ port: 8085 });
wsServer.on("connection", function (webSocket) {
    // webSocket.send("This message is pushed by server");
    webSocket.on("message", function (message) {
        var messageObj = JSON.parse(message.toString());
        var productIds = subscription.get(webSocket) || [];
        // Add new id to existing ids
        subscription.set(webSocket, __spreadArrays(productIds, [messageObj.productId]));
        console.log("Received message: " + message);
        // webSocket.send("Server has received message");
    });
});
var currentBids = new Map();
setInterval(function () {
    // If there is connection
    // if (wsServer.clients) {
    //     wsServer.clients.forEach(client => {
    //         client.send("This is a broadcast every 2 seconds");
    //     })
    // }
    // Create a new bid for each product per 2 seconds
    products.forEach(function (p) {
        var currentBid = currentBids.get(p.id) || p.price;
        var newBid = currentBid + Math.random() * 5;
        currentBids.set(p.id, newBid);
    });
    subscription.forEach(function (productIds, ws) {
        if (ws.readyState == 1) {
            var newBids = productIds.map(function (pid) { return ({
                productId: pid,
                bid: currentBids.get(pid)
            }); });
            ws.send(JSON.stringify(newBids));
        }
        else {
            console.log("Delete ws");
            subscription.delete(ws);
        }
    });
}, 2000);
// Express document
// https://expressjs.com/en/guide/routing.html
