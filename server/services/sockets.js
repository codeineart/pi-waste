/**
 * Todo
 * Wrap into a class and instantiate with reference to the
 * server app ojectlogin?redirect=%2F
 */


const socketIo = require('socket.io')         // For socket use

var io = require('socket.io')(server);

io.on('connection', function (socket) {
  socket.on('play', function () {
    io.emit('playVideo');
    //console.log("Evento de Play Recibido");
  });
  socket.on('pausar', function () {
    io.emit('pauseVideo');
    //console.log("Evento de Pausa Recibido");
  });
  socket.on('detener', function () {
    io.emit('stopVideo');
    //console.log("Evento de Detener Recibido");
  });
  socket.on('volumen', function (val) {
    io.emit('changeVolumeVideo', val);
    //console.log("Evento de Volumen Recibido, valor = " + val);
  });
  socket.on('start', function () {
    io.emit('startMed');
    //console.log("Evento de Empezar Medición Recibido");
  });
  socket.on('videoUpdate', function (time) {
    io.emit('addPoints', time);
    //console.log("Evento de Agregar Puntos Recibido")
  });
});