const express = require('express')
const router = require('./routers/users')
const newUser = require('./routers/authUser')
const app = express();
const port = 4320 || process.env.PORT; 


// Apply Middlewares
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Holle World')
})

app.get("/api", (req, res) => {
  res.json({ code: 0, message:'api is runnig'});
});


// End Point
app.use("/api",router );
app.use("/api", newUser);





// Running Server

app.listen(port , () => {
  console.log("Server Is Running On Port",port);
});
