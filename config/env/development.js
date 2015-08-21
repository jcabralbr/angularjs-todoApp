module.exports = {
    db: {
        url: 'mongodb://localhost/todoApp',
        options: {
            db: {native_parser: true},
            server: {
                poolSize: 5,
                socketOptions: {keepAlive: 1},
                auto_reconnect: true
            }
        }
    },
    sessionSecret: '12345678',
    viewEngine: 'ejs'
};
