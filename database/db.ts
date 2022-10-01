import mongoose from 'mongoose';

const mongooConnection = {
    isConnected: 0
}

export const connect = async () => {
    if(mongooConnection.isConnected) {
        return;
    }

    if(mongoose.connections.length > 0) {
        mongooConnection.isConnected = mongoose.connections[0].readyState;

        if(mongooConnection.isConnected === 1) {
            return;
        }

        await mongoose.disconnect();
    }

    await mongoose.connect(process.env.MONGO_URL || '');
    mongooConnection.isConnected = 1;
    console.log('Conectado a mongodb ' + process.env.MONGO_URL || '');
    
}

export const disconnected = async () => {
    if(process.env.NODE_ENV === 'development') return;

    if(mongooConnection.isConnected === 0) return;

    await mongoose.disconnect();
    console.log('Desconectando de MongoDB');
}