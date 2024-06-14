// app/server.js
const express = require('express');
const { agregarCancion, obtenerCanciones, actualizarCancion, eliminarCancion } = require('./queries');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/cancion', async (req, res) => {
    const { titulo, artista, tono } = req.body;

    try {
        const nuevaCancion = await agregarCancion(titulo, artista, tono);
        res.status(201).json(nuevaCancion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/canciones', async (req, res) => {
    try {
        const canciones = await obtenerCanciones();
        res.status(200).json(canciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/cancion', async (req, res) => {
    const { id, titulo, artista, tono } = req.body;

    try {
        const cancionActualizada = await actualizarCancion(id, titulo, artista, tono);
        res.status(200).json(cancionActualizada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/cancion', async (req, res) => {
    const { id } = req.query;

    try {
        const cancionEliminada = await eliminarCancion(id);
        res.status(200).json(cancionEliminada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
