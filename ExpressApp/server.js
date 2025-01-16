const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.send("Express Application!");   
});

app.post('/submit', (req, res) => {
    const {name, email} = req.body;
    res.send(`Thank you for submitting the form, ${name}! we will contact you at ${email}`);
})

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
});