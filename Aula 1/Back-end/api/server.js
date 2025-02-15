// GET, POST, PUT, DELETE

import express from "express";
import cors from "cors";
import { db } from "./connect.js";
import { ObjectId } from 'mongodb';


const app = express();
const PORT = 3000;



app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
  response.send("So endpoinsts 'artists' e 'songs' estão disponíveis");
});
app.get("/artists", async (request, response) => {
  response.send(await db.collection('artists').find({}).toArray());
});
app.get("/songs", async (request, response) => {
  response.send(await db.collection('songs').find({}).toArray());
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    // Converter o ID para ObjectId (necessário para consultas no MongoDB)
    const objectId = new ObjectId(id);

    // Atualizar o documento
    const result = await db.collection('artists').updateOne(
      { _id: objectId },         // Filtro pelo ID
      { $set: updateData }       // Dados a serem atualizados
    );

    if (result.matchedCount === 0) {
      return res.status(404).send('Registro não encontrado');
    }

    res.send('Atualizado com sucesso!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao atualizar');
  }
});

app.post('/artists', async (req, res) => {
  const newArtist = req.body;

  try {
    // Inserir o novo documento na coleção 'artists'
    const result = await db.collection('artists').insertOne(newArtist);

    // Retornar o documento recém-criado
    res.status(201).send({
      message: 'Artista adicionado com sucesso!',
      insertedId: result.insertedId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao adicionar artista');
  }
});
app.get('/artists/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Converter o ID para ObjectId
    const objectId = new ObjectId(id);

    // Buscar o documento na coleção 'artists' pelo ID
    const artist = await db.collection('artists').findOne({ _id: objectId });

    if (!artist) {
      return res.status(404).send('Artista não encontrado');
    }

    res.send(artist);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar artista');
  }
});
app.post('/songs/:artistId', async (req, res) => {
  const { artistId } = req.params;
  const newSong = req.body;

  try {
    // Certifique-se de que o artista existe
    const artist = await db.collection('artists').findOne({ _id: new ObjectId(artistId) });

    if (!artist) {
      return res.status(404).send('Artista não encontrado');
    }

    // Adicionar o ID do artista à música
    newSong.artistId = artistId;

    // Inserir a música na coleção 'songs'
    const result = await db.collection('songs').insertOne(newSong);

    res.status(201).send({
      message: 'Música adicionada com sucesso!',
      insertedId: result.insertedId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao adicionar música');
  }
});