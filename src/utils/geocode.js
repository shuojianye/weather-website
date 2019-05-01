var request = require('request')
var geocode = (address,callback)=>{
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic2h1b2ppYW4iLCJhIjoiY2p1eDgxMDg2MGtidTQwanc1dnJlNjcxcyJ9.X1LdSqKVceSBBI9lXnb14A&limit=1'
  request({url:url,json:true},(error,{body})=>{
    if(error){
      callback('Unable to connect to the location service',undefined)
    }else if (body.features.length===0){
      callback('Non matched area existed',undefined)
    }else{
      callback(undefined,{
        latitude: body.features[0].center[1],
        longtitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  })
}
module.exports = geocode
