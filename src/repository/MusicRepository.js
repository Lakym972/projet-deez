import mongoose from "mongoose";
import connect from "../../app/database_mongodb.js";

const MusicSchema = new mongoose.Schema({
    id_rapi : {type: Number, unique: true, required: true},
    title : {type: String, required: true},
    cover : {type: String},
    preview : {type: String, required: true}
})

export default mongoose.model('Music', MusicSchema);