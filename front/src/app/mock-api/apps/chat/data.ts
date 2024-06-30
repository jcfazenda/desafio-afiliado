/* eslint-disable */
import { DateTime } from 'luxon';

/* Get the current instant */
const now = DateTime.now();

/**
 * Attachments are common and will be filled from here
 * to keep the demo data maintainable.
 */
const _attachments = {
    media: [
        'assets/images/cards/01-320x200.jpg',
        'assets/images/cards/02-320x200.jpg',
        'assets/images/cards/03-320x200.jpg',
        'assets/images/cards/04-320x200.jpg',
        'assets/images/cards/05-320x200.jpg',
        'assets/images/cards/06-320x200.jpg',
        'assets/images/cards/07-320x200.jpg',
        'assets/images/cards/08-320x200.jpg'
    ],
    docs : [],
    links: []
};

/**
 *  If a message belongs to our user, it's marked by setting it as
 *  'me'. If it belongs to the user we are chatting with, then it
 *  left empty. We will be using this same conversation for each chat
 *  to keep things more maintainable for the demo.
 */
export const messages = [
    {
        id       : 'e6b2b82f-b199-4a60-9696-5f3e40d2715d',
        chatId   : '',
        contactId: 'me',
        value    : 'Hi headers!',
        createdAt: now.minus({week: 1}).set({hour: 18, minute: 56}).toISO()
    },
    {
        id       : 'eb82cf4b-fa93-4bf4-a88a-99e987ddb7ea',
        chatId   : '',
        contactId: '',
        value    : 'Hey, headers!',
        createdAt: now.minus({week: 1}).set({hour: 19, minute: 4}).toISO()
    },
    {
        id       : '3cf9b2a6-ae54-47db-97b2-ee139a8f84e5',
        chatId   : '',
        contactId: '',
        value    : 'Long time no see.',
        createdAt: now.minus({week: 1}).set({hour: 19, minute: 4}).toISO()
    },
 
    
 
];
export const chats = [
    {
        id           : 'ff6bc7f1-449a-4419-af62-b89ce6cae0aa',
        contactId    : '9d3f0e7f-dcbd-4e56-a5e8-87b8154e9edf',
        unreadCount  : 2,
        muted        : false,
        lastMessage  : 'See you tomorrow!',
        lastMessageAt: '26/04/2021'
    },
];
export const contacts = [
    {
        id         : '9d3f0e7f-dcbd-4e56-a5e8-87b8154e9edf',
        avatar     : 'assets/images/avatars/julio.jpeg',
        name       : 'Julio Fazenda',
        about      : 'Hi there! I\'m using FuseChat.',
        details    : {
            emails      : [
                {
                    email: 'bernardlangley@mail.com',
                    label: 'Personal'
                },
                {
                    email: 'langley.bernard@boilcat.name',
                    label: 'Work'
                }
            ],
            phoneNumbers: [
                {
                    country    : 'md',
                    phoneNumber: '893 548 2862',
                    label      : 'Mobile'
                }
            ],
            title       : 'Electromedical Equipment Technician',
            company     : 'Boilcat',
            birthday    : '1988-05-26T12:00:00.000Z',
            address     : '943 Adler Place, Hamilton, South Dakota, PO5592'
        },
        attachments: _attachments
    } 
];
export const profile: any = {
    id    : 'cfaad35d-07a3-4447-a6c3-d8c3d54fd5df',
    name  : 'Júlio César Fazenda',
    email : 'jcfazenda@gmail.com', 
    avatar: 'assets/images/avatars/julio.jpeg',
    about : 'Hi there! I\'m using FuseChat.'
};
