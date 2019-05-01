const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
var geocode = require('./utils/geocode')
var forcast = require('./utils/forcast')

const app = express()
var port = process.env.PORT || 3000

// Define paths for express config
const pubdir = path.join(__dirname,'../public/')
const viewsPath = path.join(__dirname,'./templates/views')
const partialsPath = path.join(__dirname,'./templates/partials')


// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(pubdir))


app.get('',(req,res)=>{
  res.render('index',{
    title:'Weather',
    name:'Gin'
  })
})

app.get('/about',(req,res)=>{
  res.render('about',{
    title:'About',
    img:'/img/icon.bmp',
    name:'Gin'
  })
})

app.get('/help',(req,res)=>{
  res.render('help',{
    title:'Help',
    statement:'Need any help? please solve it yourself',
    name: 'Gin'
  })
})


app.get('/weather',(req,res)=>{
  if (!req.query.address){
    return res.send({
      error:'please provide an address',
      title:'Weather forcast',
      name: 'Gin'
    })
  }
  geocode(req.query.address,(error,{latitude,longtitude,location}={})=>{
    if (error){
      return res.send({
        error: error,
        title:'Weather forcast',
        name: 'Gin'
    })
  }
    forcast(latitude,longtitude,(error,response)=>{
      if (error){
      return res.send({
        error:error,
        title:'Weather forcast',
        name: 'Gin'
      })
    }

      //    res.render('weather',{
      //     title:'Weather forcast',
      //     name: 'Gin',
      //     address:req.query.address,
      //     location:location,
      //     forcast:response.daily.summary
      // })
      res.send({
            address:req.query.address,
            location:location,
            forcast:response.daily.summary
      })

    })
  })
})

app.get('/products',(req,res)=>{
  if (!req.query.search){
    return res.send({
      error: 'you must provide search term'
    })
  }
  res.send({
    products:[req.query]
  })
})


app.get('/help/*',(req,res)=>{
  res.render('404',{
    title: 'Help 404 page',
    msg:'help page not found',
    name:'Gin'
  })
})

app.get('*',(req,res)=>{
  res.render('404',{
    title: '404 page',
    msg:'404',
    name:'Gin'
  })
})

app.listen(port,()=>{
  console.log('Server up at '+port)
})
