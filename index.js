const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8080
const host = 'localhost'
const db = require('./queries');
const http = require('http');
const cors = require('cors');


//////////////////////////////// START SERVER /////////////////////////////////

app.disable('etag');

var server = http.createServer(app).listen(port, function () {
  console.log(`App running on port ${port}.`)
});
// logger.info('************** SERVER STARTED **************');
// logger.info('**************  http://' + host + ':' + port +	'  **************');
server.timeout = 240000;

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/', db.createUser)

app.options('*', cors());
app.use(cors());

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

///////////////////////// USER ROUTES HERE ///////////////////////

var user = require('./app/routes/users')(app);

///////////////////////// MEAL ROUTES HERE ///////////////////////

var meal = require('./app/routes/meal')(app);


app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})


///////////////////////// OFFER ROUTES HERE ///////////////////////

var weekly_offer = require('./app/routes/weekly-offer')(app);




// app.listen(port, () => {
//     console.log(`App running on port ${port}.`)
//   })

app.post('/', (request, response) => {
  response.json({ info: 'User je ubacen u bazu!' })
})


app.delete('/delete_user', (request, response) => {
  db.deleteUser(request, response);
  response.json({ info: 'User je izbrisan!' })
})

app.put('/update_user', (request, response) => {
  db.updateUser(request, response);
  response.json({ info: 'User je izmenjen!' })
})








