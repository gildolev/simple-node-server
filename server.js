const http = require('http');
const config = require('./config.json');
const fs = require('fs');

const html = `<a  href="/">My Server</a>`
    + `<nav >`
    + `<ul >`
    + `<li>`
    + `<a href="/">Home</a>`
    + `</li>`
    + ` <li>`
    + `<a href="/about">About</a>`
    + `</li>`
    + `<li>`
    + `<a href="/contact">Contact</a>`
    + `</li>`
    + `</ul>`
    + `</nav >`

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.end(html + `</br> <h1>HOME PAGE</h1>`);
        return;
    } else if (req.url === '/about') {
        res.end(html + `</br> <h1>About</h1>`);
        return;
    } else if (req.url === '/contact') {
        res.end(html + `</br> <h1>Contact</h1>`);
        return;
    }

    const readStream = fs.createReadStream('404.html');
    readStream.on('open', function () {
        readStream.pipe(res);
    })
    readStream.on('error', function(err) {
        res.end(err);
      });

});



const port = config.port;
server.listen(port, () => {
    console.log(`listen at port ${port}`);
})