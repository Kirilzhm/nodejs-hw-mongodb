import { ContactsCollection } from "../db/models/contacts.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";
import { SORT_ORDER } from "../constants/index.js";

export const getAllContacts = async ({ 
  page = 1, 
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy =  '_id', 
  userId
  }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactsCollection.find({ userId });
  const contactCount = await ContactsCollection.find({ userId }).merge(contactsQuery).countDocuments();

  const contacts = await ContactsCollection.find({ userId }).merge(contactsQuery).skip(skip).limit(limit).sort({ [sortBy]: sortOrder }).exec();

  const paginationData = calculatePaginationData(contactCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId, userId) => {
    const contact = await ContactsCollection.findOne(
      {_id: contactId, userId}
    );
    return contact;
};

export const createContact = async (userId, payload = {}) => {
    const contact = await ContactsCollection.create({
      ...payload,
      userId
    });
    return contact;
};

export const updateContact = async (contactId, userId, payload = {}) => {
  const rawResult = await ContactsCollection.findOneAndUpdate(
      { _id: contactId, userId },
      payload,
      {
      new: true,
      includeResultMetadata: true,
      },
    );
  
    if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value ? rawResult.value._doc : rawResult._doc,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteContact = async (contactId, userId) => {
    const contact = await ContactsCollection.findByIdAndDelete({
        _id: contactId,
        userId
    });
    return contact;
};