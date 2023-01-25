import express from 'express';
import patientService from '../services/patientService';

const patientRouter = express.Router();


patientRouter.get('/', (_req, res) => {
    res.send(patientService.getAllPatientNoSSN());
});

export default patientRouter;