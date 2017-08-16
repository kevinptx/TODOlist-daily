const express = require("express")
const app = express()
const mustache = require("mustache-express")
const bodyParser = require("body-parser")
var expressValidator = require('express-validator');
app.engine("mustache", mustache())
app.set("view engine", "mustache")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: false}))
app.use(expressValidator());

//declare the empty array to place the incomplete TODOs and the completed array to house the completed TODOs.
var todos = []
var completed = []

//get shows the form
app.get("/", function (req, res) {
  res.render('index', {
    todos: todos,
    completed: completed
  });
});

//post processes the form
app.post("/", function (req, res) {
  //we are pushing the todos into the input type text with name "todo" of the mustache html.
  todos.push(req.body.todo);
  res.redirect('/');
})

app.post('/completed', function (req, res) {
  const remove = req.body.completed
  //this is removing 1 completed item from the todo list each time done button is clicked. it's finding the array position of indexOf. The indexOf() method returns the position of the first occurrence of a specified value in a string.
  todos.splice(todos.indexOf(remove), 1)
  //we are pushing what was in remove to completed array.
  completed.push(remove);
  res.redirect('/');
})


app.listen(3000, function() {
  console.log("Listening on 3000")
})
