const express = require('express');
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Express Application!");   
});

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
});