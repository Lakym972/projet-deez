db.createUser({
    user: "lakym972",
    pwd: "root",
    roles: [{role: "readWrite", db: "top_music" }]
});

db.musics.insertMany([{}]);