module.exports = app => {
    app.use('/', require('./base.routes'))
    app.use('/mapa', require('./map.routes'))
    app.use('/libros', require('./place.routes.js'))
    app.use('/api', require('./api.routes'))
}