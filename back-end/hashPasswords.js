const mysql = require('mysql');
const bcrypt = require('bcrypt');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Nishar-2005',  // Replace with your MySQL password
    database: 'workmanagement'
});

db.connect(async (err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to database');

    db.query('SELECT userID, password FROM users', async (err, users) => {
        if (err) {
            console.error('Error fetching users:', err);
            db.end();
            return;
        }

        for (let user of users) {
            if (!user.password.startsWith('$2b$')) { // Only hash if not already hashed
                const hashedPassword = await bcrypt.hash(user.password, 10);
                
                db.query('UPDATE users SET password = ? WHERE userID = ?', [hashedPassword, user.userID], (err) => {
                    if (err) {
                        console.error(`Error updating password for user ${user.userID}:`, err);
                    } else {
                        console.log(`Password updated for user ${user.userID}`);
                    }
                });
            }
        }

        console.log('Password hashing completed');
        db.end();
    });
});
