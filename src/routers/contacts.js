import { Router } from "express";
import {
    getContactsController, 
    getContactByIdController, 
    createContactController,
    patchContactController,
    deleteContactController} from "../controllers/contacts.js";
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));
router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));
router.post('/contacts/contactId', ctrlWrapper(createContactController));
router.patch('contac6ts/contactId', ctrlWrapper(patchContactController));
router.patch('/contacts/contactId', ctrlWrapper(deleteContactController));

export default router;