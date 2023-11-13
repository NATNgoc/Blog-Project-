const app = require('./app')

const server = app.listen(6890, () => {
    console.log("Welcome to BlogD ", 6890)
})

process.on('SIGINT', () => {
    server.close(() => { console.log("Close server", 6890) })
})