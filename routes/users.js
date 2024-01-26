const express = require('express');
const fs = require('fs');
const router = express.Router();
const usersFilePath = './data/users.json';
const currentIdFilePath = './data/currentId.json';

// Utility function to read JSON file
const readJsonFile = (filePath) => {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

// Utility function to write JSON file
const writeJsonFile = (filePath, data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// GET all users
router.get('/', (req, res) => {
    const users = readJsonFile(usersFilePath);
    res.json(users);
});

// POST a new user
router.post('/', (req, res) => {
    const { name, username, email } = req.body;
    const currentIdData = readJsonFile(currentIdFilePath);
    const users = readJsonFile(usersFilePath);

    const newUser = { id: currentIdData.id, name, username, email };
    users.push(newUser);

    // Update the current ID
    currentIdData.id += 1;
    writeJsonFile(currentIdFilePath, currentIdData);

    // Save the new users list
    writeJsonFile(usersFilePath, users);

    res.status(201).send(newUser);
});

router.put('/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const updatedUserInfo = req.body;

    const users = readJsonFile(usersFilePath);
    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updatedUserInfo, id: userId };
        writeJsonFile(usersFilePath, users);
        res.send(users[userIndex]);
    } else {
        res.status(404).send('User not found');
    }
});

// DELETE endpoint to delete a user
router.delete('/:id', (req, res) => {
    const userId = parseInt(req.params.id);

    const users = readJsonFile(usersFilePath);
    const newUsers = users.filter(user => user.id !== userId);

    if (users.length !== newUsers.length) {
        writeJsonFile(usersFilePath, newUsers);
        res.send(`User with ID ${userId} deleted successfully`);
    } else {
        res.status(404).send('User not found');
    }
});

module.exports = router;
