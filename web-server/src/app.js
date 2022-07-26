const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/gecode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')   // Can be changed to another path name like ../templates
const partialsPath = path.join(__dirname, '../templates/partials')

// Set handelbars engine and views location
app.set('view engine', 'hbs') // Set view engine to handlebars (hbs)
app.set('views', viewsPath); // Set views location. This is the location where we will put our hbs files
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Peter Aronov'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        description: 'Hey my name is Peter Aronov and I am a web developer.',
        name: 'Peter Aronov'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This app is used to fetch data weather about a provided location.'
    })
})

// Query string is used to pass data to the server e.g localhost:3030/weather?search=something&location=somethingelse

app.get('/weather', (req, res) => {
    if (!req.query.address) {    // Use of query string to pass data to the server
        return res.send({
            error: 'You must provide an address.'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, { locationFull, weatherData }) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: weatherData,
                locationFull: locationFull,
                locationPartialy: location,
                address: req.query.address
            })
        })
    })
})

// This is the last rout that will be called and it will be called if no other rout is called

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})


// nodemon app.js -e js,hbs 