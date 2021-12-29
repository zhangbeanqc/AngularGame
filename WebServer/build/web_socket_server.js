"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var product_1 = require("./product");
var ws_1 = require("ws");
var app = express();
var prodcuts = [
    new product_1.Product(1, "第一個商品", 10.99, 3, "這是第一個商品", ["電子產品", "硬件設備"]),
    new product_1.Product(2, "第二個商品", 30.99, 4, "這是第二個商品", ["電子產品"]),
    new product_1.Product(3, "第三個商品", 15.99, 5, "這是第三個商品", ["硬件設備"]),
    new product_1.Product(4, "第四個商品", 70.99, 2.5, "這是第四個商品", ["硬件設備"]),
    new product_1.Product(5, "第五個商品", 110.99, 1.5, "這是第五個商品", ["軟件工具"]),
    new product_1.Product(6, "第六個商品", 22.99, 3.5, "這是第六個商品", ["軟件工具"])
];
app.get('/api/', function (req, res) {
    res.send('Hello Express');
});
app.get('/api/products', function (req, res) {
    res.json(prodcuts);
});
app.get('/api/product/:id', function (req, res) {
    res.json(prodcuts.find(function (p) { return p.id == parseInt(req.params.id); }));
});
var server = app.listen(8000, 'localhost', function () {
    console.log("Server is up, address: http://localhost:8000");
});
var subscription = new Map();
var wsServer = new ws_1.Server({ port: 8085 });
wsServer.on("connection", function (webSocket) {
    webSocket.send("This message is pushed by server");
    webSocket.on("message", function (message) {
        var messageObj = JSON.parse(message.toString());
        var productIds = subscription.get(webSocket) || [];
        // Add new id to existing ids
        subscription.set(webSocket, __spreadArrays(productIds, [messageObj.productId]));
        console.log("Received message: " + message);
        webSocket.send("Server has received message");
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
    prodcuts.forEach(function (p) {
        var currentBid = currentBids.get(p.id) || p.price;
        var newBid = currentBid + Math.random() * 5;
        currentBids.set(p.id, newBid);
    });
    subscription.forEach(function (productIds, ws) {
        var newBids = productIds.map(function (pid) { return ({
            productId: pid,
            bid: currentBids.get(pid)
        }); });
        ws.send(JSON.stringify(newBids));
    });
}, 2000);
