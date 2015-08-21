var routeAdapter = require('../util/route_promisse_adapter');

module.exports = function(server) {

    var todo = server.app.controllers.todo;
    server.get('/todos/', routeAdapter.resolvePromisse(todo.consultar));
    server.get('/todos/:id', routeAdapter.resolvePromisse(todo.consultarByid));
    server.post('/todos', routeAdapter.resolvePromisse(todo.incluir));
    server.put('/todos/:id', routeAdapter.resolvePromisse(todo.editar));
    server.delete('/todos/:id', routeAdapter.resolvePromisse(todo.remover));
};