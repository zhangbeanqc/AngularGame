import * as express from 'express';
import { Product } from './product';
import { Server } from 'ws';

const app = express();

const prodcuts: Product[] = [
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
    )];

app.get('/api/', (req, res) => {
    res.send('Hello Express');
});

app.get('/api/products', (req, res) => {
    res.json(prodcuts);
});

app.get('/api/product/:id', (req, res) => {
    res.json(prodcuts.find((p) => p.id == parseInt(req.params.id)));
});

const server = app.listen(8000, 'localhost', () => {
    console.log("Server is up, address: http://localhost:8000");
});

const subscription = new Map<any, number[]>();

const wsServer = new Server({port: 8085});
wsServer.on("connection", webSocket=> {
    webSocket.send("This message is pushed by server");
    webSocket.on("message", message => {

        let messageObj = JSON.parse(message.toString());
        let productIds = subscription.get(webSocket) || [];
        // Add new id to existing ids
        subscription.set(webSocket, [...productIds, messageObj.productId]);

        console.log("Received message: " + message);
        webSocket.send("Server has received message");
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
    prodcuts.forEach(p => {
       let currentBid = currentBids.get(p.id) || p.price;
       let newBid = currentBid + Math.random() * 5;
       currentBids.set(p.id, newBid);
    }) ;

    subscription.forEach((productIds, ws) => {
        let newBids = productIds.map(pid => ({
            productId: pid,
            bid: currentBids.get(pid)
        }));
        ws.send(JSON.stringify(newBids));
    })

}, 2000);
