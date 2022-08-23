const fs = require("fs/promises");
const path = require("path");
// const { nanoid } = require("nanoid");
// import { nanoid } from 'nanoid';
const shortid = require("shortid");

const contactsPath = path.join(__dirname, "db/contacts.json")

const listContacts = async() => {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
}

const getContactById = async (id) => {
    const contacts = await listContacts();
    const result = contacts.find(el => el.id === id);
    return result || null;
}

const addContact = async ({ name, email, phone }) => {
    const contacts = await listContacts();
    const newContact = {
        id: shortid.generate(),
        name,
        email,
        phone,
    }
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
}

const removeContact = async(id) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === id);
    if(index === -1){
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
}

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
}

// const fs = require("fs/promises");
// const path = require("path");

// const file = async ({ filepath, action }) => {
//     switch (action) {
//         case "read":
//             const text = await fs.readFile(filepath, "utf-8");
//             console.log(text);
//             break;
//     }
// }

// const filepath = "./db/file.txt";

// file({ filepath, action: "read" });