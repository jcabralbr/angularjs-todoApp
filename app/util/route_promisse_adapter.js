var result = require('./result');

exports.resolvePromisse= function(controllerPromise)
{
    return function(req, res){
        controllerPromise(req, res)
            .then(function(val){
                console.log(req.method);
                var status = 200;
                if (req.method == 'GET')
                    status = result.statusOK;
                else if (req.method == 'POST')
                    status = result.statusCreated;
                else if (req.method == 'PUT')
                    status = result.statusAccepted;
                else if (req.method == 'DELETE')
                    status = result.statusAccepted;
                res.send(status ,val);
            })
            .catch(function(err){
                if (err.http_code)
                {
                    res.send(err.http_code, err.message);
                }
                else if (err.status)
                {
                    res.send(err.status, err.message);
                }
                else {
                    res.send(result.InternalError, "Erro no servidor");
                }
            })
            .done();
    };
};