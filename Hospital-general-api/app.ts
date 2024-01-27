import app from './src/app';

const port = process.env.PORT || 3000;

const iniciarServidor = async () => {
    try {
        await app();
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
    }
};

iniciarServidor();