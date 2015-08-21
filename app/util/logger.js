var logger = exports;
logger.debugLevel = 'error';
logger.log = function(level, message) {
    var levels = ['error', 'warn', 'info', 'debug'];
    if (levels.indexOf(level) <= levels.indexOf(logger.debugLevel)) {
        if (typeof message !== 'string') {
            message = JSON.stringify(message);
        };
        console.log(level + ': ' + message);
    }
};

logger.error = function(message) {
    this.log('error', message);
};

logger.warn = function(message) {
    this.log('warn', message);
};

logger.info = function(message) {
    this.log('info', message);
};

logger.debug = function(message) {
    this.log('debug', message);
};