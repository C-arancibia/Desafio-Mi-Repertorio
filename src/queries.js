// app/queries.js
const pool = require('./db');

const agregarCancion = async (titulo, artista, tono) => {
    const query = {
        text: 'INSERT INTO canciones (titulo, artista, tono) VALUES ($1, $2, $3) RETURNING *',
        values: [titulo, artista, tono],
    };

    try {
        const result = await pool.query(query);
        return result.rows[0];
    } catch (error) {
        console.error('Error en agregarCancion:', error.message);
        throw error;
    }
};

const obtenerCanciones = async () => {
    try {
        const result = await pool.query('SELECT * FROM canciones');
        return result.rows;
    } catch (error) {
        console.error('Error en obtenerCanciones:', error.message);
        throw error;
    }
};

const actualizarCancion = async (id, titulo, artista, tono) => {
    const query = {
        text: 'UPDATE canciones SET titulo = $2, artista = $3, tono = $4 WHERE id = $1 RETURNING *',
        values: [id, titulo, artista, tono],
    };

    try {
        const result = await pool.query(query);
        return result.rows[0];
    } catch (error) {
        console.error('Error en actualizarCancion:', error.message);
        throw error;
    }
};

const eliminarCancion = async (id) => {
    const query = {
        text: 'DELETE FROM canciones WHERE id = $1 RETURNING *',
        values: [id],
    };

    try {
        const result = await pool.query(query);
        return result.rows[0];
    } catch (error) {
        console.error('Error en eliminarCancion:', error.message);
        throw error;
    }
};

module.exports = {
    agregarCancion,
    obtenerCanciones,
    actualizarCancion,
    eliminarCancion,
};
