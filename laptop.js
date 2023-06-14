const express =  require('express');
const fs = require ('fs');

let port = 3600;

/*Now we got server named 'app': */
const app = express();

function change(templ,laptop){

    let newHtml = templ.replaceAll('{%IMAGE%}',laptop.image)
        .replaceAll('{%CPU%}',laptop.cpu)
        .replaceAll('{%ID%}',laptop.id)
        .replaceAll('{%PRODUCTNAME%}',laptop.productName)
        .replaceAll('{%RAM%}',laptop.ram)
        .replaceAll('{%STORAGE%}',laptop.storage)
        .replaceAll('{%SCREEN%}',laptop.screen)
        .replaceAll('{%PRICE%}',laptop.price)
        .replaceAll('{%DESCRIPTION%}',laptop.description)
        
    return newHtml
}

let laptopTempl = fs.readFileSync('./templates/laptopTempl.html','utf-8');
let overviewTempl = fs.readFileSync('./templates/overviewTempl.html','utf-8');
let cardTempl = fs.readFileSync('./templates/cardTempl.html','utf-8');
let dataTxt = fs.readFileSync('./data/data.json','utf-8');
const data = JSON.parse(dataTxt);
console.log(data)

app.use(express.static('./public'))


app.get('/laptop/:id',(req,res) => {

    console.log(req.params.id)
    res.send(change(laptopTempl,data[req.params.id]))

})


app.get('/',(req,res) => {

    let cards = data.map(el => change(cardTempl, el)).join('\n');
    console.log(cards);
    res.send(overviewTempl.replace('{%CARDLIST%}', cards));  
  
  } )
  
// 127.0.0.1:3600
// localhost:3600
//localhost: 3600/product/1

app.listen(port,()=> {

    console.log(`I am express server, listening on ${port}`)
})

