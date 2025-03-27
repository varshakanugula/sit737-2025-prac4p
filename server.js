const express = require('express');
const winston = require('winston');

const app = express();
const port = 3000;

// Configure Winston Logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculator-microservice' },
    transports: [
        new winston.transports.Console({ format: winston.format.simple() }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' })
    ]
});

// Middleware to parse JSON requests
app.use(express.json());

// Calculator Routes
app.get('/add', (req, res) => {
    const { num1, num2 } = req.query;
    if (isNaN(num1) || isNaN(num2)) {
        logger.error("Invalid input for addition.");
        return res.status(400).json({ error: "Invalid numbers provided" });
    }
    const result = parseFloat(num1) + parseFloat(num2);
    logger.info(`Addition: ${num1} + ${num2} = ${result}`);
    res.json({ operation: "addition", result });
});

app.get('/subtract', (req, res) => {
    const { num1, num2 } = req.query;
    if (isNaN(num1) || isNaN(num2)) {
        logger.error("Invalid input for subtraction.");
        return res.status(400).json({ error: "Invalid numbers provided" });
    }
    const result = parseFloat(num1) - parseFloat(num2);
    logger.info(`Subtraction: ${num1} - ${num2} = ${result}`);
    res.json({ operation: "subtraction", result });
});

app.get('/multiply', (req, res) => {
    const { num1, num2 } = req.query;
    if (isNaN(num1) || isNaN(num2)) {
        logger.error("Invalid input for multiplication.");
        return res.status(400).json({ error: "Invalid numbers provided" });
    }
    const result = parseFloat(num1) * parseFloat(num2);
    logger.info(`Multiplication: ${num1} * ${num2} = ${result}`);
    res.json({ operation: "multiplication", result });
});

app.get('/divide', (req, res) => {
    const { num1, num2 } = req.query;
    if (isNaN(num1) || isNaN(num2) || parseFloat(num2) === 0) {
        logger.error("Invalid input for division.");
        return res.status(400).json({ error: "Invalid numbers provided or division by zero" });
    }
    const result = parseFloat(num1) / parseFloat(num2);
    logger.info(`Division: ${num1} / ${num2} = ${result}`);
    res.json({ operation: "division", result });
});

// Start the server
app.listen(port, () => {
    logger.info(`Calculator microservice running at http://localhost:${port}`);
    console.log(`Calculator microservice running at http://localhost:${port}`);
});
