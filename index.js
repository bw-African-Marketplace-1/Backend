require('dotenv').config();

const server = require('./Api/server.js');

const PORT = process.env.DB_ENV === 'testing' ? 4000 : 5000;
server.listen(PORT, () => {
    console.log(`n== Server listening on port ${PORT} ==/n`);
});

