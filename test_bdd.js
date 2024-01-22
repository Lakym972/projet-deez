import mongoose from "mongoose";

mongoose.connect('mongodb://lakym972:root@localhost:27017/top_music')
  .then(() => console.log('Connected!'));