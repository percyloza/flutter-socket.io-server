const { io } = require('../index');

const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();

bands.addBand(new Band( 'Kjarkas') );
bands.addBand(new Band( 'Illimani') );
bands.addBand(new Band( 'Proyección') );
bands.addBand(new Band( 'Amaru') );
 
//console.log(bands);

// mensajes de socket
io.on('connection', client => {
    console.log('Client connected');

    client.emit('active-bands', bands.getBands() );

    client.on('disconnect', () => { 
        console.log('Client disconnected');
     });

    client.on('mensaje', ( payload) => { 
        console.log('Mensaje!', payload);
        io.emit('mensaje', {admin: 'Nuevo mensaje'});
    });

    client.on('vote-band', ( payload) => { 
        bands.voteBand( payload.id );
        io.emit('active-bands', bands.getBands() ); 
    });

    client.on('add-band', ( payload) => { 
        bands.addBand( new Band( payload.name) );
        io.emit('active-bands', bands.getBands() ); 
    });

    client.on('delete-band', ( payload) => { 
        bands.deleteBand( payload.id );
        io.emit('active-bands', bands.getBands() ); 
    });

    // client.on('emitir-mensaje', ( payload) => { 
    //     //console.log(payload);
    //     //io.emit('nuevo-mensaje', payload);
    //     client.broadcast.emit('emitir-mensaje', payload);
    // });
});