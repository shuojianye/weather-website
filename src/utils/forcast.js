var request = require('request')
var forcast = (latitude,longtitude,callback)=>{
  const url = 'https://api.darksky.net/forecast/239a9394786215c7ad12a03c290ebfc4/'+ latitude+','+longtitude
  request({url:url,json:true},(error,{body})=>{
    if(error){
      callback('Unable to connect to the weather service',undefined)
    }else if (body.error){
      callback('No matched location shown in weather database',undefined)
    }else{
      callback(undefined,body)
    }
  })
}

module.exports =forcast
