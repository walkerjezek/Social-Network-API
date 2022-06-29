const connection = require("../config/connection");
const { User, Thought } = require("../models");

connection.on('error', (err) => err);

connection.once('open', async () => {
    await User.deleteMany({});
    await Thought.deleteMany({});

    const users = [
        {
            username: "walker1",
            email: "walker1@gmail.com" 
        },
        {
            username: "walker2",
            email: "walker2@gmail.com"
        },
        {
            username: "walker3",
            email: "walker3@gmail.com"
        },
        {
            username: "walker4",
            email: "walker4@gmail.com"
        },
        {
            username: "walker5",
            email: "walker5@gmail.com"
        },
    ];
    const thoughts = [
        {
            username: "walker1",
            thought: "I am the best"
        },
        {
            username: "walker2",
            thought: "Yes, I agree walker is the best"
        },
        {
            username: "walker3",
            thought: "Coding is fun"
        },
        {
            username: "walker4",
            thought: "This class has been a lot of work"
        },
        {
            username: "walker5",
            thought: "Despite the work, this class has been fun"
        },
    ];
    await User.collection.insertMany(users);
    await Thought.collection.insertMany(thoughts);

    
    process.exit(0);


});