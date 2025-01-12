// src/services/dataStoreService.js
const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../data/users.json');

function loadUsers() {
  try {
    if (!fs.existsSync(dataFilePath)) {
      return [];
    }
    const fileData = fs.readFileSync(dataFilePath, 'utf-8');
    if (!fileData) return [];
    return JSON.parse(fileData);
  } catch (err) {
    console.error('Error loading users.json:', err);
    return [];
  }
}

function saveUsers(users) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving users.json:', err);
  }
}

module.exports = {
  loadUsers,
  saveUsers
};
