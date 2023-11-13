const {io} = require('../index'); 
 
// mensajes de socket
io.on('connection', client => {
    console.log('Client connected');

    client.on('disconnect', () => { 
        console.log('Client disconnected');
     });

    client.on('mensaje', ( payload) => { 
        console.log('Mensaje!', payload);

        io.emit('mensaje', {admin: 'Nuevo mensaje'});
    });
});