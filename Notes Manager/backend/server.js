const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const usersRoutes = require('./routers/usersRouter');
const studentsRoutes = require('./routers/studentRouter');
const notesRouter=require('./routers/notesRouter');
const cookieParser = require('cookie-parser');
const session=require('express-session');

const app = express();
app.use(express.static('public'));
app.use(cors());
app.use(cookieParser());
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/ete_users');
app.use('/users', usersRoutes);
app.use('/students', studentsRoutes);
app.use('/notes',notesRouter);

app.listen(3000, () => {
    console.log("http://localhost:3000");
});
