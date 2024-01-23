import mongoose from "mongoose";
import connect from "../../app/database_mongodb.js";

const UserSchema = new mongoose.Schema({
    username : {type: String, unique: true, required: true},
    firstname : {type: String, required: false},
    lastname : {type: String, required: false},
    email : {type: String, unique: true, required: true},
    password : {type: String, required: true},
    roles : {type: Array, required: true},
    a2f : {type: String},
    enable_a2f : {type: Boolean, default: false},
    date : {type: Date, default: Date.now}
});

export default mongoose.model('User', UserSchema);