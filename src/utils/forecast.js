const request = require('request')


const forecast = (latitude,longitude,callback) => {

    const url = 'http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=cdbf93e482ccc3716bcb811fe57f330f'
  
    request({url,json:true}, function (error, response, body) {//request({url:url,json:true}, function (error, response, body) {//request({url:url}, function (error, response, body) {
      if(error){
          callback('Unable to connect to weather services!',undefined)
      }else if(body.message==='city not found') {
          callback('Unable to find location. Try another search.',undefined)
      } else{
          callback(undefined,{
            main : body.weather[0].main,
            description : body.weather[0].description 
          })
      }
    
  });
  
  }

  module.exports = forecast