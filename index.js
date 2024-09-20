require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors({
    origin: "*",
    credentials: true,
}));
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    const ip_addr = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    res.render('welcome', { ip_addr });
});

app.use((req, res, next) => {
    return res.status(404).json({
        status: 'NOT FOUND',
        message: 'Resource not found!',
        data: null
    });
});

app.use((err, req, res, next) => {
    return res.status(500).json({
        status: 'INTERNAL SERVER ERROR',
        message: err.message,
        data: null
    });
});

app.listen(PORT, () => console.log(`Server running in port ${PORT}`));