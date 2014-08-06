var _ = require('lodash-node');

var users = [{
    id: 1,
    firstName: "Adi",
    lastName: "Srikanth",
    login: "adi",
    email: "aadisrikanth@gmail.com",
    createdLecs: [1],
    joinedLecs: [2]
},{
    id: 2,
    firstName: "Sachin",
    lastName: "Tendulkar",
    login: "sachin",
    email: "sachin.tendulkar@gmail.com",
    createdLecs: [2],
    joinedLecs: [1,2]
}];

var ops = {};
ops.findById = function(id) {
    var out = {},
        id = id;
    var data = _.filter(users, function(elem){
        if(elem.id === id) {
            return true;
        }
    });
    if(data.length) {
        out.user = data[0];
    } else {
        out.user = {};
    }
    return out;
}

ops.findByIds = function(ids) {
    var out = {},
        ids = ids;
    var data = _.filter(users, function(elem){
        if(ids.indexOf(elem.id.toString()) !== -1) {
            return true;
        }
    });
    out.users = data;
    return out;
}

ops.findAll = function() {
    var out = {};
    out.users = users;
    
    return out;
}

ops.add = function(Obj, id) {
    if(!id) {
        Obj.id = generateId();
    }
    users.push(Obj);
}

ops.delete =  function(id) {
    var data = _.filter(users, function(elem){
        if(elem.id !== id) {
            return true;
        }
    });
    users = data;
}

ops.update= function(Obj) {
    ops.delete(Obj.id);
    users.push(Obj);
    users = _.indexBy(users, function(Obj){
        return Number(Obj.id); 
    });
}

function generateId() {
    var Obj = users[users.length-1];
    return (Obj.id+1);
}

module.exports = ops;
