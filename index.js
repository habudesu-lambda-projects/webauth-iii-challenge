const server = require('./server.js')

const port = process.env.PORT || 9000;
server.listen(port, () => console.log(`Running on port ${port}`))