var mocky = require('mocky');
var fs = require('fs');

var ctpath = '/api';

mocky.createServer([{
    // Todos
    url: ctpath+'/todos',
    method: 'get',
    headers: {'Content-type': 'text/json'},
    res: function(req, res, callback) {
        fs.readFile('./response_data/todos.json', 'utf8', function(err, text) {
            console.log(text);
            callback(null, {
            status: 200,
            headers: {'Content-type': 'text/json', 'Access-Control-Allow-Origin': 'http://localhost:8080'},
            body: text,
            });
        });
    }
}]).listen(4321);
