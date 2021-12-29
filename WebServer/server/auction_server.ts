import * as express from 'express';
import { Product } from "./product";
import {Server} from "ws";
import * as path from 'path';

const app = express();


const categories = new Map([
    ['1','軟件工具'],
    ['2','硬件設備'],
    ['3','電子產品']
]);

const products: Product[] = [
    new Product(
        1,
        "第一個商品",
        10.99,
        3,
        "這是第一個商品",
        ["電子產品", "硬件設備"]
    ),
    new Product(
        2,
        "第二個商品",
        30.99,
        4,
        "這是第二個商品",
        ["電子產品"]
    ),
    new Product(
        3,
        "第三個商品",
        15.99,
        5,
        "這是第三個商品",
        ["硬件設備"]
    ),
    new Product(
        4,
        "第四個商品",
        70.99,
        2.5,
        "這是第四個商品",
        ["硬件設備"]
    ),
    new Product(
        5,
        "第五個商品",
        110.99,
        1.5,
        "這是第五個商品",
        ["軟件工具"]
    ),
    new Product(
        6,
        "第六個商品",
        22.99,
        3.5,
        "這是第六個商品",
        ["軟件工具"]
    )
];

export class Comment {

    constructor(
        public id: number,
        public productId: number,
        public timestamp: string,
        public user: string,
        public rating: number,
        public content: string) { }
}

const comments: Comment[] = [
    new Comment(1, 1, "2021-01-01T10:20:30.002Z", "User1", 2.5, "Not very impressive."),
    new Comment(3, 1, "2021-02-15T11:10:20.002Z", "User3", 4.5, "Good."),
    new Comment(2, 1, "2021-11-11T20:22:13.002Z", "User2", 3.5, "So so."),
    new Comment(4, 1, "2021-12-21T13:03:22.002Z", "User4", 4, "Like it."),
    new Comment(2, 3, "2021-02-11T20:22:10.241Z", "User2", 4, "Very good product!"),
    new Comment(3, 2, "2021-03-21T10:10:32.332Z", "User3", 3.5, "No comment!")
]

app.use('/', express.static(path.join(__dirname, '..', 'client')))

app.get('/api/', (req, res) => {
    res.send('Hello Express');
});

// app.get('/', (req, res) => {
//     res.redirect('/api/')
// });

app.get('/api/categories', (req, res) => {
    res.json(categories);
})

app.get('/api/products', (req, res) => {
    let result = products;
    let params = req.query;

    if (params.title) {
        result = result.filter(p => p.title.indexOf(<string>params.title) != -1);
    }

    if (params.price && result.length > 0) {
        result = result.filter(p => p.price <= parseInt(<string>params.price));
    }

    if (params.category && params.category != '-1' && result.length > 0) {
        result = result.filter(p => p.categories.indexOf(categories.get(<string>params.category)) != -1);
    }

    res.json(result);
});

app.get('/api/product/:id', (req, res) => {
    res.json(products.find((p) => p.id == parseInt(req.params.id)));
});

app.get('/api/product/:id/comments', (req, res) => {
    res.json(comments.filter(comment => comment.productId == parseInt(req.params.id)));
});

const server = app.listen(8000, 'localhost', () => {
    console.log("Server is up, address: http://localhost:8000");
});

const subscription = new Map<any, number[]>();

const wsServer = new Server({port: 8085});
wsServer.on("connection", webSocket=> {
    // webSocket.send("This message is pushed by server");
    webSocket.on("message", message => {

        let messageObj = JSON.parse(message.toString());
        let productIds = subscription.get(webSocket) || [];
        // Add new id to existing ids
        subscription.set(webSocket, [...productIds, messageObj.productId]);

        console.log("Received message: " + message);
        // webSocket.send("Server has received message");
    })
});

const currentBids = new Map<number, number>();

setInterval(() => {
    // If there is connection
    // if (wsServer.clients) {
    //     wsServer.clients.forEach(client => {
    //         client.send("This is a broadcast every 2 seconds");
    //     })
    // }

    // Create a new bid for each product per 2 seconds
    products.forEach(p => {
        let currentBid = currentBids.get(p.id) || p.price;
        let newBid = currentBid + Math.random() * 5;
        currentBids.set(p.id, newBid);
    }) ;

    subscription.forEach((productIds, ws) => {
        if (ws.readyState == 1) {
            let newBids = productIds.map(pid => ({
                productId: pid,
                bid: currentBids.get(pid)
            }));
            ws.send(JSON.stringify(newBids));
        } else {
            console.log("Delete ws")
            subscription.delete(ws);
        }
    })

}, 2000);

// Express document
// https://expressjs.com/en/guide/routing.html