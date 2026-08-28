const express = require("express");

const aplicativo = express();

aplicativo.use(express.json());

const VERIFICAR_TOKEN =
  process.env.VERIFICAR_TOKEN || "meu_token_whatsapp_2026";

// Verificação do webhook pela Meta
aplicativo.get("/webhook", (req, res) => {
  const modo = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const desafio = req.query["hub.challenge"];

  if (modo === "subscribe" && token === VERIFICAR_TOKEN) {
    console.log("Webhook verificado com sucesso!");
    return res.status(200).send(desafio);
  }

  return res.sendStatus(403);
});

// Receber mensagens/eventos do WhatsApp
aplicativo.post("/webhook", (req, res) => {
  console.log("Webhook recebido:");
  console.log(JSON.stringify(req.body, null, 2));

  res.sendStatus(200);
});

// Rota para testar se o servidor está funcionando
aplicativo.get("/", (req, res) => {
  res.send("Bot WhatsApp funcionando!");
});

const PORTA = process.env.PORT || 3000;

aplicativo.listen(PORTA, "0.0.0.0", () => {
  console.log(`Servidor funcionando na porta ${PORTA}`);
});
