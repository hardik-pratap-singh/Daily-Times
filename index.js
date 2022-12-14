
const express = require('express') 
const app = express() ; 
// const { json } = require('express');
const bodyParser =  require('body-parser')
const fetch = require('node-fetch')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
    res.redirect("/news") ; 
})


// news api : ef321c68074544eeb8b728d3d1c16d3a
app.set('view engine', 'ejs');
let matrix = [];



let data ; 
fetch("https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=ef321c68074544eeb8b728d3d1c16d3a&lang=en")
        .then(res => res.json())
        .then(abc => {
            data = abc;  
        }) 

//don't forget to check the API after coming back to a project after a long time, it may be that it needs to be upgraded.
app.get("/news", (req, res) => {
            
            let love = (data.articles);
            love.forEach((x) => {
                matrix.push({
                    title: x.title,
                    img: x.urlToImage,
                    url : x.url , 
                    author : x.author
    
                })
            })

                res.render('show', {
                    array: matrix
                })

                matrix = [] ; 
                    
})

let matrix1 = [] ; 
let vardata ; 

app.post("/requireNews" , (req , res) => {
    const search = req.body.search ;  

    https://newsapi.org/v2/everything?q=tesla&apiKey=1244f596e7e941db8750db29782da6b5
    //    fetch("https://newsapi.org/v2/everything?q="+search+"&sources=bbc-news&apiKey=1244f596e7e941db8750db29782da6b5&lang=en")
       fetch("https://newsapi.org/v2/everything?q=" + search + "&apiKey=1244f596e7e941db8750db29782da6b5")
        .then(res => res.json())
        .then(data  => {
            let x = data.articles ; 
            // console.log(x) ; 
            x.forEach((ele) => {
                matrix1.push({
                    title: ele.title,
                    img: ele.urlToImage,
                    url : ele.url , 
                    author : ele.source.id
                })
            })

            // console.log(matrix1); 


            res.render("show" , {
                array : matrix1 
            })

            matrix1 = [] ; 

            
        }) 
})


app.listen(PORT, () => {
    console.log(`Server running @ ${PORT}`);

})