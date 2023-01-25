import express from 'express';
import cors from 'cors';
import diagnosesRouter from './routes/diagnoses';
import patientRouter from './routes/patient';
const app = express();
app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());


app.get('/api/ping', (_req, res) => {
    res.status(200).send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientRouter);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`App is listening on PORT ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});