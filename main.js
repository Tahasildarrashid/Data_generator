const express = require("express")
const mongoose = require("mongoose")
const Employee = require("./models/Employee");
const { arrayBuffer } = require("stream/consumers");
const app = express()

mongoose.connect('mongodb://127.0.0.1:27017/company');
const port = 3000

app.set('view engine', 'ejs')

app.get('/', (req, res) => [
    res.render('index', { foo: 'FOO' })
])

function getRandom(arr)
{
    let a = Math.floor(Math.random() * (arr.length - 1))
    return arr[a];
}

function getRandomSalary()
{
    let a = Math.floor(Math.random() * 1000000 )
    return a;
}

let names = ['rohan', 'sanajana', 'rohit', 'shivam', 'hemanth', 'abdul']
let language = ['C', 'C++', 'python', 'Rust', 'Ruby on Rails', 'Java']
let city = ['Bengaluru', "Kolkata", 'Mumbai', 'Pune', 'Hyderabad', 'Ahemdabad']


app.get('/generate', async (req, res) => {
    for (let i = 0; i < 10; i++) {
    let e = await Employee.create({
        name: getRandom(names),
        salary: getRandomSalary(),
        language: getRandom(language),
        city: getRandom(city),
        isManager: ( Math.random() > 0.5 ) ? true : false
    })
}
})

app.get('/delete', async (req, res) => {
    let a = await Employee.deleteMany({})
    console.log("Deleted data sucessfully")
})

app.listen(port, () => {
    console.log(`Example app listening on ${port}`)
})

