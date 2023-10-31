const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { MongoClient } = require("mongodb");
const app = express();
app.use(express.json());

const uri = process.env.MONGODB_URI;
const port = process.env.PORT || 3000;

app.use(cors());

// Créez un client MongoDB
const client = new MongoClient(uri, {
  useUnifiedTopology: true, // Utilisez cette option pour éviter les avertissements de dépréciation
});

// Fonction pour initialiser la connexion MongoDB
async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connecté à la base de données MongoDB Atlas");
  } catch (err) {
    console.error("Erreur de connexion à la base de données MongoDB:", err);
  }
}

// Endpoint GET pour obtenir les données du nuage de mots
app.get("/wordcloud", async (req, res) => {
  const db = client.db("crbdb");
  const collection = db.collection("words");
  const wordCloudData = await collection.find().toArray();
  res.json(wordCloudData);
});

// Endpoint POST pour ajouter ou mettre à jour un mot
app.post("/wordcloud", async (req, res) => {
  const { word } = req.body;
  const db = client.db("crbdb");
  const collection = db.collection("words");

  try {
    const existingWord = await collection.findOne({ word });

    if (existingWord) {
      await collection.updateOne({ word }, { $inc: { count: 1 } });
    } else {
      await collection.insertOne({ word, count: 1 });
    }

    res.json({ message: "Word added or updated successfully" });
  } catch (error) {
    console.error("Error processing the request:", error);
    res.status(500).json({ error: "An error occurred while processing the request" });
  }
});

// Assurez-vous que la connexion à la base de données est établie avant de démarrer le serveur
connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Serveur Express en cours d'exécution sur le port ${port}`);
  });
});
