// console.log("Hallo, dear friend");
// const yargs = require("yargs");
// const { hideBin } = require("yargs/helpers");
const { Command } = require("commander");
const program = new Command();

const contacts = require("./contacts");


const invokeAction = async({ action, id, name, email, phone }) => {
    switch (action) {
        case "listContacts":
            const allContacts = await contacts.listContacts();
            console.table(allContacts);
            break;
        case "getContactById":
            const contactsById = await contacts.getContactById(id);
            console.table(contactsById);
            break;
        case "addContact":
            const newContact = await contacts.addContact({ name, phone, email });
            console.table(newContact);
            break;
        case "removeContact":
            const removeContact = await contacts.removeContact(id);
            console.table(removeContact);
            break;
    }
}

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();
invokeAction(argv);
// const arr = hideBin(process.argv)
// const { argv } = yargs(arr);
// invokeAction(argv);

// invokeAction({ action: "listContacts" });
// invokeAction({ action: "getContactById", id: "5" });
// invokeAction({ action: "addContact", name: "5", phone: "5", email: "5" });
// invokeAction({ action: "removeContact", id: "WJB-akbn2" });
