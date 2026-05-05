const express = require("express");
const WebSocket = require("ws");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

let values = {};

const server = app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});

const wss = new WebSocket.Server({ server });

function broadcast(data) {
    const message = JSON.stringify(data);
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

wss.on("connection", (ws) => {
    console.log("Client verbunden");

    Object.entries(values).forEach(([id, value]) => {
        ws.send(JSON.stringify({ id, value }));
    });

    ws.on("close", () => {
        console.log("Client getrennt");
    });
});

app.put("/values/:id", (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    values[id] = value;

    console.log(`Update: ${id} = ${value}`);

    broadcast({ id, value });

    res.sendStatus(200);
});

app.get("/values", (req, res) => {
    res.json(values);
});