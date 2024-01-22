db.createUser({
    user: "lakym972",
    pwd: "root",
    roles: [{role: "readWrite", db: "top_music" }]
});

db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "username": 1 }, { unique: true });