const asyncHandler = require("express-async-handler");
const Contact = require('../models/contactmodel');

const getContacts = async (req, res) => {
    const contacts =  await Contact.find({user_id: req.user.id});

    res.status(200).json(contacts);
}
const createContact = asyncHandler(async (req, res) => {
    console.log(req.body);
    const {
        name,
        email,
        phone
    } = req.body
    if (!name || !email || !phone) {
        return res.status(400).json({
            message: 'Please enter all fields'
        });
    }
    const contact =await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });
    await contact.save(); 
    res.status(200).json(contact);
});
const getContact = asyncHandler(async (req, res) => {
    const contact= await Contact.findById(req.params.id)
    if(!contact){
        return res.status(404).json({
            message: 'Contact not found'
        }); 
    }
    res.status(200).json(contact);
})

const updateContact = asyncHandler(async (req, res) => {
    const contact= await Contact.findById(req.params.id)
    if(!contact){
        return res.status(404).json({
            message: 'Contact not found'
        }); 
    }
    if(contact.user_id.toString() !== req.user.id){
        return res.status(401).json({
            message: 'Not authorized'
        });
    }   
    const contactupdate= await Contact.findByIdAndUpdate(req.params.id,req.body,{ new:true,});
    res.status(200).json(contactupdate);
    console.log(req.params.id);
})
const deleteContact = asyncHandler(async (req, res) => {
    const contact= await Contact.findById(req.params.id)
    if(!contact){
        return res.status(404).json({
            message: 'Contact not found'
        }); 
    }
    if(contact.user_id.toString() !== req.user.id){
        return res.status(401).json({
            message: 'Not authorized'
        });
    } 
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json(contact);
})  
module.exports = {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact
};