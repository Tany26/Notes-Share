const express = require('express');
const app = express();
const path = require('path');
app.use(express.static('public'));

const PORT = process.env.PORT || 4444;


const db = require('./config/db');
db();



//ROUTES

app.use(express.json());

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');


app.use('/api/files', require('./routes/file'));
app.use('/files', require('./routes/show'));
app.use('/files/download', require('./routes/download'));





app.listen(PORT, () => {
    console.log('https://localhost/4444');
})