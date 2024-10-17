let http = require('http');
let fs = require('fs');
let url = require('url');

let server = http.createServer((req, res) => {

    let arquivo = url.parse(req.url).pathname;

    // verificando se um arquivo foi informado na URL
    if (!arquivo || arquivo == '/') {
        arquivo = '/index.html';
    }

    fs.readFile(__dirname + arquivo, (err, data) => {

        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html;charset=utf-8' });
            res.write('<h1>Página não localizada</h1>');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
            res.write(data);
        }

        res.end();
    });

});

server.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000/');
});