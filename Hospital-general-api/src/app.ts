import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './config/db';


import usersRoutes from './routes/users.routes';

const app = express();
const port = process.env.PORT || 3000;
app.disable('x-powered-by')
app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next()
})


app.get('/', (req, res) => {
    res.send('api works')
  })

app.use('/api/users', usersRoutes);

interface IUserRequest extends express.Request {
    user: any
    sistema: any
  }
  const start = async () => {
    try {
        await db();  // Asumiendo que db() devuelve una promesa (por ejemplo, mongoose.connect())
        console.log('Database connection is ready!');
        
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.error('Error starting the server:', error);
    }
};

export default start;  
