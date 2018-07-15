const express = require('express');
const app = express();
const fs = require('fs');

const port = process.env.PORT || 3000;

const hbs = require('hbs');

hbs.registerPartials(__dirname+'/views/partials')

hbs.registerHelper('getCurrentYear',() => {
  return new Date().getFullYear();
})
hbs.registerHelper('screamIt',(text)=> {
  return text.toUpperCase();
})


app.set('view engine','hbs')

app.use('/public',express.static(__dirname + '/public'));
app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log',log+'\n',(err) => {
    if (err) {
      console.log('error in log');
    }
  });
  console.log(`${now}: ${req.method} ${req.url}`);
  next();
})

//
// app.use((req,res,next) => {
//   res.render('maintainance.hbs');
// })

app.get('/',(req,res) => {
  res.render('home.hbs',{
    pageTitle:'Home Page',
    welcomeMessage:'Welcome to underground',
  });
})

app.get('/about',(req,res) => {
  res.render('about.hbs',{
    pageTitle:'About Page',
  });
});

app.get('/bad',(req,res) => {
  res.send({
    errorMessage: 'Unable ot handle response'
  });
});

app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
