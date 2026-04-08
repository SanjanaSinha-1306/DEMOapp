const db = require('../utils/database');

const User = {
    // 1. Find user by email
    findByEmail: async (email) => {
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0]; // Returns the user object if found, otherwise undefined
    },

    // 2. Create new user
    create: async (name, email, password) => {
        return await db.execute(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, password]
        );
    }
};


module.exports = User;