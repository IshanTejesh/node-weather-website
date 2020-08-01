const request = require('request')

const geocode = (address,callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoidGVqZXNoMTIzIiwiYSI6ImNrZDZyMWk5ZjBrZWwyenJhamlvNzFxdDQifQ.7iM6N99ihLvpRYkR-H2uWQ&limit=1'
    
    request({url,json:true},(error, {body})=>{//request({url:url,json:true},(error, response)=>{
      if(error){
            callback('Unable to connect to location services!', undefined)
        }else if(body.features.length === 0){//}else if(response.body.features.length === 0){
            callback('Unable to find location. Try another search.', undefined)
        }else{
            callback(undefined,{
               latitude : body.features[0].center[0],
               longitude : body.features[0].center[1],
               location : body.features[0].place_name
            })  
        }
    })

}

module.exports=geocode