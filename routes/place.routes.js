const router = require("express").Router();

const Place = require('../models/Place.model.js')


router.get("/crear", (req, res, next) =>{
  res.render("./../views/libros/new-libro")
})

router.post("/crear", (req, res, next) => {

  const { name, type, lat, lng } = req.body
  console.log(req.body)

  
  
  const location = {
      type: 'Point',
      coordinates: [lat, lng]
  }

  Place
      .create({ name, type, location })
      .then(() => res.redirect('/libros/mapa'))
      .catch(err => console.log(err))
})




router.get("/mapa", (req, res, next) =>{
  res.render("./../views/libros/list.hbs")
})


router.get("/listado", (req, res, next) =>{


  Place
  .find()
  .then(places => res.render('./../views/libros/listado', { places }))
  .catch(err => console.log(err))
})


router.get('/editar', (req, res, next) => {

  const { places_id } = req.query

  Place
    .findById(places_id )
    .then(theBook => res.render('libros/editado', theBook))
    .catch(err => console.log(err))
})

router.post('/editar/:id', (req, res, next) => {

  const { id } = req.params
  const { name, type, lat, lng } = req.body

  Place
    .findByIdAndUpdate(id, { name, type, lat, lng }, { new: true })
    .then(theBook => res.redirect("./../views/libros/listado", theBook))
    .catch(err => console.log(err))
})


router.post('/eliminado', (req, res, next) =>{
  const { places_id } = req.query

  Place
    .findById(places_id )
    .then(theBook => res.render('libros/eliminado', theBook))
    .catch(err => console.log(err))
})

router.post('/eliminado/:id', (req, res, next) => {

  const { id } = req.params
  const { name, type, lat, lng } = req.body

  Place
    .findByIdAndRemove(id, { name, type, lat, lng }, { new: true })
    
  


})


module.exports = router;
