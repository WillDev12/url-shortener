// Npm run dev
// localhost:3000

require('dotenv').config()
const mongoose = require('mongoose')

const express = require('express')
const shortenedURL = require('./models/shortenedURL')
const app = express()
app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.DATABASE_URL)

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/generate', async (req, res) => {
    const urlData = {
        url: req.body.urlName
    }

    const shortURL = await shortenedURL.create(urlData)
    res.render("index", { newUrl: `${req.headers.origin}/${shortURL.id}`})
})

app.route('/:id/').get(handleRedirect).post(handleRedirect)
app.route('/stats/:id/').get(handleStats).post(handleStats)

async function handleRedirect(req, res) {
    const shortUrl = await shortenedURL.findById(req.params.id)
    shortUrl.hitcount++
    await shortUrl.save()
    res.redirect(shortUrl.url)
}

async function handleStats(req, res) {
    const urlStats = await shortenedURL.findById(req.params.id)
    res.send('Number of impressions: ' + urlStats.hitcount)
}

app.listen(process.env.PORT, () => {console.log("listening on " + process.env.PORT)})

module.exports = app;