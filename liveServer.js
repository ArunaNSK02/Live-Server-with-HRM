const http = require('http');
const path = require('path');
const fs = require('fs');
const webSocket = require('ws');

const mimeTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".json": "application/json",
    ".jpg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon"
};

const server = http.createServer((req, res) => {
    
    let filePath = path.join(__dirname, req.url === "/" ? "index.html": req.url);
    let fileExt = path.extname(filePath);

    let contentType = mimeTypes[fileExt];

    fs.readFile(filePath,(err, data) => {
        if(err) {
            fs.readFile(path.join(__dirname, '404.html'),(err, errData) => {
                if(err) {
                    console.log(err);
                } else {
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    res.write(errData, "utf-8");
                    res.end();
                }
            })
        } else {
            if (contentType == "text/html") {
                data = data.toString().replace("</body>", "<script src='./webSocketClient.js'></script></body>");
            }
            res.writeHead(200, {'Content-Type': contentType});
            res.write(data, "utf-8");
            res.end();
        }
    })
})

const webSocketServer = new webSocket.Server({server});

webSocketServer.on("connection", (clientSocket) => {
    console.log("Client Connected!");

    clientSocket.on("close", () => {
        console.log("Client Disconnected!");
    })
    
})

fs.watch(__dirname, {recursive: true}, (event, fileName) => {
    if (fileName) {
        webSocketServer.clients.forEach((client) => {
            if(client.readyState === webSocket.OPEN) {
                client.send("Reload!");
            }
        })
    }
})


server.listen(5000);
