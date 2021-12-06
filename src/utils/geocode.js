const request = require('request')

const geocode = (address , callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWRpdHlhLTIxMyIsImEiOiJja3dzNnJubTIxM3A2MnB1c25mdTBhamM5In0.lk4gq3_Kop3GIQK5QPfY4Q'
    
    request({url : url , json : true} , (error , response) => {
        if(error) {
            callback('Unable to connect to location Services' , undefined)
        }
        else if(response.body.features.length === 0) {
            callback('Unable to find Location. try another search' , undefined)
        }
        else {
            callback(undefined , {
                latitude : response.body.features[0].center[1] ,
                longitude : response.body.features[0].center[0] ,
                location : response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode