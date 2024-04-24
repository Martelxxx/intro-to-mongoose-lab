const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();
const Customer = require('./models/customer.js');
const prompt = require('prompt-sync')();

const connect = async () => { 
    await mongoose.connect(process.env.MONGODB_URI);
    await runQueries();
    await mongoose.disconnect();
    process.exit();
}

const username = prompt('What is your name? ');
console.log();

console.log(`Welcome to the CRM, ${username}`);
console.log();

console.log('What would you like to do?');
console.log();

    console.log('1. Create a new customer');
    console.log('2. View all customers');
    console.log('3. Update a customer');
    console.log('4. Delete a customer');
    console.log('5. Quit');
    console.log();

const choice = prompt('Enter your choice: ');

const createCustomer = async () => {
if(choice === '1') {
    const name = prompt('Enter customer name: ');
    const age = prompt('Enter customer age: ');
    const customerData = new Customer({
        name,
        age
    });
    await Customer.create(customerData);
    console.log(`${name} is a new customer!`);
    }
}

const findCustomers = async () => {
    if(choice === '2') {
    const customers = await Customer.find({});
    console.log('All customers:', customers);
    }
}

const updateCustomer = async () => {
    if(choice === '3') {
    const customerx = await Customer.find({});
    console.log('All customers:', customerx);
    const name = prompt('Enter customer name to update: ');
    const cumstomers = await Customer.findOneAndUpdate(
        { name: name },
    { 
        name: prompt('New Name: '),
        age: prompt('New Age: ')
    },
    { new: true }
);
console.log('Customer updated!');
}
}

const deleteCustomer = async () => {
    if(choice === '4') {
    const customerx1 = await Customer.find({});
    console.log('All customers:', customerx1);
    const name = prompt('Enter customer name to delete: ');
    const cumstomers = await Customer.findOneAndDelete(
        { name: name }
);
console.log('Customer Deleted!');
}
}

const quit = async () => {
    if(choice === '5') {
    console.log('Exiting! DO NOT COME BACK! GOOD RIDDANCE! WHY ARE YOU STILL HERE???');
}
}

const runQueries = async ()  => {
    console.log('Running queries...');
    await quit();
    await findCustomers();
    await deleteCustomer()
    await createCustomer();
    await updateCustomer();
}

connect();