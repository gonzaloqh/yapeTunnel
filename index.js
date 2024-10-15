const admin = require("firebase-admin");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Inicializar la app de Firebase Admin
const serviceAccount = require("receptoryape-c5ca67c4034a.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Endpoint para recibir datos del emisor
app.post("/send-notification", (req, res) => {
  const { title, body, topic } = req.body;

  const message = {
    notification: {
      title: title,
      body: body
    },
    topic: topic // Asegúrate de que el cliente esté suscrito a este tema
  };

  // Enviar la notificación
  admin.messaging().send(message)
    .then((response) => {
      console.log("Notificación enviada con éxito:", response);
      res.status(200).send("Notificación enviada con éxito");
    })
    .catch((error) => {
      console.error("Error al enviar la notificación:", error);
      res.status(500).send("Error al enviar la notificación");
    });
});

// Exportar la app para Netlify
module.exports = app;
