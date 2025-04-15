// models/Admin.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
});
const Admin = mongoose.models.Admin;

module.exports = Admin;
