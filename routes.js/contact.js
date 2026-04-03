import express from 'express';
import ContactControllerObj from '../controller/contact.js';

const router = express.Router();

router.post('/submit', ContactControllerObj.submitContact);

export default router;