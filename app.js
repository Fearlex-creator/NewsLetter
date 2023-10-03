

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});

const http = require('http');
const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Initialize the storedIPAddresses array
const storedIPAddresses = [];

app.use(bodyParser.json());

app.post('/store-ip', (req, res) => {
    const ipAddress = req.body.ipAddress;
    if (ipAddress) {
        storedIPAddresses.push(ipAddress);
        writeIPAddressesToFile(storedIPAddresses);
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
});

app.get('/ip-addresses', (req, res) => {
    const ipAddressFile = path.join(__dirname, 'ip-addresses.txt');
    fs.readFile(ipAddressFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading IP addresses:', err);
            res.sendStatus(500);
        } else {
            res.send(data);
        }
    });
});

const server = http.createServer(app);

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});

function writeIPAddressesToFile(ipAddresses) {
    const ipAddressFile = path.join(__dirname, 'ip-addresses.txt');
    const dataToWrite = ipAddresses.join('\n');
    
    fs.writeFile(ipAddressFile, dataToWrite, (err) => {
        if (err) {
            console.error('Error writing IP addresses to file:', err);
        } else {
            console.log('IP addresses written to file.');
        }
    });
}
