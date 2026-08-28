const express = require("express");

const app = express();

app.use(express.json());

const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "meu_token_whatsapp_2026";

// Verificação do webhook pela Meta
app.get("/webhook", (req, res) => {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
        console.log("Webhook verificado com sucesso!");
        return res.status(200).send(challenge);
    }

    return res.sendStatus(403);
});

// Receber mensagens/eventos do WhatsApp
app.post("/webhook", (req, res) => {
    console.log("Webhook recebido:");
    console.log(JSON.stringify(req.body, null, 2));

    res.sendStatus(200);
});

// Rota para testar se o servidor está funcionando
app.get("/", (req, res) => {
    res.send("Bot WhatsApp funcionando!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor funcionando na porta ${PORT}`);
});
