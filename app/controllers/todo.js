var logger = require('../util/logger');
var mongoose = require('mongoose');
var Todo = mongoose.model('Todo');
var m2merr = require('../util/m2merr');
var Q = require('q');

exports.consultar = function (req, res) {

    /*var nome = req.params.nome;
    var email = req.params.email;*/
    var deferred = Q.defer();

   /* if (!nome){
        logger.error("nome não pode ser null no método de consulta");
        var e = new m2merr.InvalidArgument('O nome precisa ser definido');
        return Q.reject(e);
    }

    if (!email){
        logger.error("email não pode ser null no método de consulta");
        var e = new m2merr.InvalidArgument('O email precisa ser definido');
        return Q.reject(e);
    }*/

    //var filter = { nome : nome, email: email};

    Todo.find(function(err, todos) {
            if (err) {
                logger.error(err);
                var e = new m2merr.InternalError('Server Error');
                deferred.reject(e);
                //deferred.reject(new Error(error));

            } else {
                deferred.resolve(todos);
            }
        });

        return deferred.promise;
};

exports.consultarByid = function (req, res) {

    var id = req.params.id;
    var deferred = Q.defer();

    if (!id) {
        logger.error("id não pode ser null no método de consulta");
        var e = new m2merr.InvalidArgument("O código do usuário precisa ser informado");
        return Q.reject(e);
    }

    var filter = { _id : id};

    Todo.findOne(filter, function(err, todos) {
        if (err) {
            logger.error(err);
            var e = new m2merr.InternalError('Server Error');
            deferred.reject(e);
            //deferred.reject(new Error(error));

        } else {
            deferred.resolve(todos);
        }
    });

    return deferred.promise;
};

exports.incluir = function (req, res) {

    var nome = req.body.nome;
    var email = req.body.email;

    if (!nome) {
        logger.error("Nome não pode ser null no método de inclusão");
        var e = new m2merr.InvalidArgument("O nome precisa ser informado");
        return Q.reject(e);
    }

    if (!email) {
        logger.error("Email não pode ser null no método de inclusão");
        var e = new m2merr.InvalidArgument("O email precisa ser informado");
        return Q.reject(e);
    }

    var deferred = Q.defer();

    var todo = new Todo({
        nome: nome,
        email: email
    });

    var deferred = Q.defer();

    var filter = { nome : nome, email: email};

    Todo.find(filter, function(err, todos) {
        if (err) {
            logger.error(err);
            var e = new m2merr.InternalError('Server Error');
            deferred.reject(e);
            //deferred.reject(new Error(error));

        } else {
            if (todos.length > 0){
                logger.error("Todo existe no banco");
                var e = new m2merr.InternalError('Server Error');
                deferred.reject(e);
                //deferred.reject(new Error("Todo existe no banco"));
            } else {
                todo.save(function(err, todoSalvo){
                    if (err){
                        deferred.reject(new Error(err));
                    } else {
                        deferred.resolve(todoSalvo._id);
                    }
                });
            }
        }
    });
    return deferred.promise;
};

exports.editar = function (req, res) {

    var id = req.params.id;
    var nome = req.body.nome;
    var email = req.body.email;

    if (!id) {
        logger.error("Id não pode ser null no método de inclusão");
        var e = new m2merr.InvalidArgument("O id precisa ser informado");
        return Q.reject(e);
    }

    if (!nome) {
        logger.error("Nome não pode ser null no método de inclusão");
        var e = new m2merr.InvalidArgument("O nome precisa ser informado");
        return Q.reject(e);
    }

    if (!email) {
        logger.error("Email não pode ser null no método de inclusão");
        var e = new m2merr.InvalidArgument("O email precisa ser informado");
        return Q.reject(e);
    }

    var changes = {
        nome: nome,
        email: email
    };

    var filter = { _id: mongoose.Types.ObjectId(id)};

    var deferred = Q.defer();

    Todo.update(filter, { $set: changes }, function(err, rows) {
        if (err) {
            logger.error(err);
            var e = new m2merr.InternalError('Server Error');
            deferred.reject(e);
            //deferred.reject(new Error(error));

        } else {
            if (rows > 0) {
                deferred.resolve(rows);
            } else {
                var e = new m2merr.InternalError('Nenhum registro foi alterado.');
                deferred.reject(e);
            }
        }
    });
    return deferred.promise;
};

exports.remover = function (req, res) {

    var id = req.params.id;

    if (!id) {
        logger.error("Id não pode ser null no método de inclusão");
        var e = new m2merr.InvalidArgument("O id precisa ser informado");
        return Q.reject(e);
    }

    var deferred = Q.defer();

    Todo.remove({ _id: mongoose.Types.ObjectId(id)}, function(err, rows) {
        if (err) {
            logger.error(err);
            var e = new m2merr.InternalError('Server Error');
            deferred.reject(e);
            //deferred.reject(new Error(error));

        } else {
            if (rows.result.n > 0) {
                deferred.resolve("registro excluido");
            } else {
                var e = new m2merr.InternalError('Nenhum registro foi excluido.');
                deferred.reject(e);
            }
        }
    });
    return deferred.promise;
};