import mongoose from "mongoose";
import connect from "../../app/database_mongodb.js";

const PlayListSchema = new mongoose.Schema({
    name : {type: String, required: true},
    songs : {type: Array},
    user : {type: String, required: true},
    date : {type: Date, default: Date.now}
})

export default mongoose.model('PlayList', PlayListSchema);