const winston = require('winston');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
const { format: dateFnsFormat } = require('date-fns');

require('winston-daily-rotate-file')

const myFormat = printf(({ level, message, timestamp, userId, stack }) => {
    const formattedTimestamp = dateFnsFormat(new Date(timestamp), 'dd/MM/yyyy HH:mm:ss');
    return `[${formattedTimestamp}] - ${level.toUpperCase()} - Message: ${message} - UserId: ${userId ? userId : '[NULL]'} - Stack trace: ${stack}`;
});

const transportApiError = new transports.DailyRotateFile({
    filename: 'logs/error.%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    level: 'error'
});

const transportApiCombined = new transports.DailyRotateFile({
    filename: 'logs/combined.%DATE%.log',
    datePattern: 'YYYY-MM-DD'
});

const logger = winston.createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        myFormat,
        format.errors({ stack: true }),
    ),
    transports: [
        transportApiError,
        transportApiCombined
    ],
});


module.exports = logger