import mongoose from 'mongoose';

const mongoConnection = {
    isConnected: 0
}

export const connect = async () => {
    if(mongoConnection.isConnected) {
        return;
    }

    if(mongoose.connections.length > 0) {
        mongoConnection.isConnected = mongoose.connections[0].readyState;

        if(mongoConnection.isConnected === 1) {
            return;
        }

        await mongoose.disconnect();
    }

    await mongoose.connect(process.env.MONGO_URL || '');
    mongoConnection.isConnected = 1;
    console.log('Conectado a mongodb ' + process.env.MONGO_URL || '');
    
}

export const disconnected = async () => {
    if(process.env.NODE_ENV === 'development') return;

    if(mongoConnection.isConnected === 0) return;

    await mongoose.disconnect();

    mongoConnection.isConnected = 0;

    console.log('Desconectando de MongoDB');
}