// server.js - Backend para el multijugador en línea con Node.js y Socket.IO

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Configuración básica del servidor
const PORT = process.env.PORT || 3000;

// Rutas del servidor
app.get('/', (req, res) => {
  res.send('Servidor backend de Tetris en línea en ejecución');
});

// Manejo de eventos de Socket.IO
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado:', socket.id);

  socket.on('message', (msg) => {
    console.log('Mensaje recibido:', msg);
    io.emit('message', msg);
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});