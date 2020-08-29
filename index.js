require('dotenv').config();
const server = require('./Api/server.js');

const PORT = process.env.PORT ? process.env.PORT : 3300;
server.listen(PORT, () => {
    console.log(`\n=== Server listening on port ${PORT} ===\n`);
});




