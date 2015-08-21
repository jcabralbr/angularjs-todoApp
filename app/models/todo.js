var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var todoSchema = new Schema({
    nome : {type : String},
    email : {type : String},
    atualizacao : { type: Date, default: Date.now }
}, {collection : "Todo"});


todoSchema.set('toJSON', {
    getters: true,
    virtuals: true
});

mongoose.model('Todo', todoSchema);