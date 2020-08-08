const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const config = require('./config/config.js');

const app = express();
const port = 3000;


app.use(bodyParser());

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});

app.post('/products/:productId', (req, res) => {
    const productId = req.params.productId;
    const body = req.body;
    console.log(body);
    axios({
        url: `${config.squarespaceApiBaseUrl}/commerce/products/${productId}`,
        headers: {
            "Authorization": config.squarespaceApiKey,
            "User-Agent": "bgcolc-api",
            "Content-Type": "application/json"
        },
        method: 'post',
        data: body
    }).then(response => {
        res.statusCode = response.status;
        res.statusMessage = response.statusText;
        res.send();
    }).catch(error => {
        console.log(error.response);
        res.statusCode = error.response.status;
        res.send(error.response.statusText);
    });
});