const facts = require('./facts.json')

const express = require('express')
const app = express()
app.use(express.static('public'));


const PORT = process.env.PORT || "3000"

app.set('view engine', 'ejs')

app.listen(PORT, ()=> {
    console.log( `App is running on http://localhost:${PORT}...`)
})

app.get("/", (req, res) => {

    res.send("Good Job!")

})

// http://localhost:3000/greet?name=kaylee&dob=2002
app.get('/greet', (req, res)=> {
    console.log(req.query)
   
    res.send(`Hey, ${req.query.name} <br/> You are ${2022 - req.query.year} or ${2023 - req.query.year} years old`)
})

app.get('/math/:num1/:op/:num2', (req, res)=> {
    console.log( req.params )
    const num1 = parseInt(req.params.num1)
    const num2 = parseInt(req.params.num2)
    const operation = req.params.op
    let result = 0

    if(operation == 'plus'){
        result = num1+num2
    }
    if (operation == 'subtract'){
        result = num1-num2
    }
    if (operation == 'multiply'){
        result = num1*num2 
    }
    if (operation == 'divide'){
        result = num1/num2
    }

   

    // res.send(`${req.params.num1}`)
    // res.json( {message: "Hey Dude"} )
    res.render( 'math', {title:'math', result: result})
})

app.get('/pandorasbox', (req, res)=> {

    // do the work
    const coin = Math.floor(Math.random() * 2)
   
    if(coin == 0){
        fetch("https://icanhazdadjoke.com/", { 
        headers: {
            "Accept": "application/json"
        }
        })
        .then( res => res.json() )
        .then( (data) => {
            console.log(data)
            res.render('pandorasbox', {title: "Pandora's Box", message: data.joke} )
        })
        console.log(coin)
    }
    else{
        // const message = "DAD JOKE"
        const length = facts.length;
        const random =  Math.floor( Math.random() * length)
        const fact4 = facts[random].fact

        res.render('pandorasbox', {title: "Pandora's Box", message:fact4} )
        console.log(coin)
    }

    

    

})