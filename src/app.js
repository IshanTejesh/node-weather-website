const express = require('express')
const path = require('path')
const hbs = require('hbs')

//Files to import
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// //console.log(__filename)
// console.log(path.join(__dirname,'../public'))


const app = express()
const port = 3000

//Define paths for Exrpess config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath)) // search for root url so down app.get('') this will never run


app.get('/', (req, res) => {
    //res.send('<h1>Hello World!</h1>')
    res.render('index', {
        title: 'Weather App',
        name: 'Ram'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ram'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Ram'
    })
})

// app.get('/weather', (req, res) => {
//     res.send({
//         forecast: 'It is raining',
//         location: 'Durg'
//     })
// })

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error !== undefined) {
            return res.send({ error })
        }
        else {
            forecast(latitude, longitude, (error, { main, description } = {}) => {
                if (error !== undefined) {
                    return res.send({ error })
                }
                else {
                    return res.send({
                        forecast: description,
                        location: location,
                        address: req.query.address
                    })
                }

            })
        }
    })

    // res.send({
    //     forecast: 'It is raining',
    //     location: 'Durg',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help',
        name: 'Ram',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ram',
        errorMessage: 'Help article not found'
    })
})

// app.get('/help', (req, res) => {
//     res.send([{
//         name:'Ram',
//         age: 24
//     },{
//         name:'Shyam',
//         age: 24
//     }])
// })

// app.get('/help', (req, res) => {
//     res.send({
//         name:'Ram',
//         age: 24
//     })
// })


//app.com
//app.com/help
//app.com/about

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
