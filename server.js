console.log('may the node be with you');
const express = require('express');
const app = express();

app.listen(3000, function() {
    console.log('listening on port 3000')
})
app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html')
})