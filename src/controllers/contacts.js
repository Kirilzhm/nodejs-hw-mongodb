import createHttpError from 'http-errors';
import { 
  getAllContacts, 
  getContactById, 
  createContact,
  updateContact,
 deleteContact} from '../services/contacts.js';
 import { parsePaginationParams } from '../utils/parsePaginationParams.js';
 import { parseSortParams } from '../utils/parseSortParams.js';
 import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
 import { getEnvVar } from '../utils/getEnvVar.js';

export const getContactsController = async (req, res) => {
  const { page, perPage} = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
    const contacts = await getAllContacts({
      page,
      perPage,
      sortBy,
      sortOrder,
      userId: req.user._id,
    });

    res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
    });
};

export const getContactByIdController = async (req, res) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId, req.user._id);
  
    if (!contact) {
      throw createHttpError(404, 'Contact not found');
    }
  
    res.json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
};

export const createContactController = async (req, res) => {
  const photo = req.file;

  let photoUrl;

  if(photo) {
    if (getEnvVar('ENABLE_CLOUDNARY') === true) {
        photoUrl = await saveFileToUploadDir(photo);
    } else {
        photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const contact = await createContact(req.user._id, {...req.body, photo: photoUrl});

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
};

export const patchContactController = async (req, res) => {
  const { contactId } = req.params;
  const photo = req.file;

  let photoUrl;

  if(photo) {
    if (getEnvVar('ENABLE_CLOUDNARY') === true) {
        photoUrl = await saveFileToUploadDir(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const result = await updateContact(contactId, req.user._id, {...req.body, photo: photoUrl});

  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const {contactId} = req.params;
  const contact = await deleteContact(contactId, req.user._id);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).send();

};