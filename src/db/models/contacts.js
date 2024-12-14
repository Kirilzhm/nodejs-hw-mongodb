import { model, Schema } from "mongoose";

const contactsSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        email: {
            type: String,
        },
        isFavourite: {
            type: Boolean,
            default: false,
        },
        contactType: {
            type: String,
            required: true,
            default: 'personal',
            enum: ['work', 'home', 'personal'],
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const ContactsCollection = model('contacts', contactsSchema);

const contactsPatchSchema = new Schema(
    {
        name: {
            type: String,
        },
        phoneNumber: {
            type: String,
        },
        email: {
            type: String,
        },
        isFavourite: {
            type: Boolean,
            default: false,
        },
        contactType: {
            type: String,
            default: 'personal',
            enum: ['work', 'home', 'personal'],
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const ContactsPatchCollectin = model('contacts_patch', contactsPatchSchema);