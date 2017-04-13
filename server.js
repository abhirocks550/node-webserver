const express = require('express');
const hbs = require('hbs');
const app = express();
const fs = require('fs');

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('There is an error connecting file');
        }
    });
    console.log(log);
    next();
})

// Apply maintenance page 

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render("home", {
        pageTitle: 'Welcome page',
        welcomeMessage: 'Welcome to Home Page'
    });
});

app.get('/about', (req, res) => {
    res.render("about", {
        name: "Abhijit",
        welcomeMessage: 'Welcome to About page'
    });
});


app.listen(3000, () => {
    console.log('listening on port 3000');
})
