const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Conectado a la base de datos'))
    .catch(err => console.error('Error conectando a la base de datos', err));

// Ruta para la raíz
app.get('/', (req, res) => {
    res.send('Bienvenido a la API de EventoSocial. Usa /eventos para acceder a los eventos.');
});

// Esquema de eventos
const eventoSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    aforo: Number,
    ubicacion: String,
    marca: String
});

const Evento = mongoose.model('Evento', eventoSchema);

// Rutas
app.get('/eventos', async (req, res) => {
    const eventos = await Evento.find();
    res.json(eventos);
});

app.post('/eventos', async (req, res) => {
    const nuevoEvento = new Evento(req.body);
    await nuevoEvento.save();
    res.json(nuevoEvento);
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
