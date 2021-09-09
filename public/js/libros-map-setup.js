function initMap() {

    const map = new google.maps.Map(
        document.querySelector('#myMap'),
        {
            zoom: 10,
            center: directions.ironhackMAD.coords,
            styles: mapStyles
        }
    )

    getBooks(map)
}


function getBooks(map) {

    axios
        .get('/api/places')
        .then(response => printBooks(response.data, map))
        .catch(err => console.log(err))
}


function printBooks(places, map) {

    places.forEach(elm => {

        let position = {
            lat: elm.location.coordinates[0],
            lng: elm.location.coordinates[1]
        }

        new google.maps.Marker({ map, position, title: elm.name })
    })
}   console.log(printBooks)
