 var _ = require('lodash-node');

var events = [{
  id: 1,
  name: 'Ember MVC',
  desc: 'Ember MVC Lecture',
  creator: 1,
  joinedUsers: [2],
  createdDate: '2014-05-27T12:54:01Z',
  scheduledDate: '2014-06-27T12:54:01Z',
  place: 'Hyderabad, India',
  publicVisibility: true
}, {
  id: 2,
  name: 'Ember MVC',
  desc: 'Ember MVC Lecture',
  creator: 2,
  joinedUsers: [1,2],
  createdDate: '2014-05-27T12:54:01Z',
  scheduledDate: '2014-06-29T12:54:01Z',
  place: 'Bangalore, India',
  publicVisibility: true
}];

var ops = {};
ops.findById = function(id) {
    var out = {},
        id = id;
    data = _.filter(events, function(elem){
        if(elem.id === id) {
            return true;
        }
    });
    if(data.length) {
        out.event = data[0];
    } else {
        out.event = {};
    }
    return out;
}

ops.findAll = function() {
    var out = {};
    out.events = events;
    
    return out;
}

ops.add = function(Obj, id) {
    var out = {
      events:[]
    };
    if(!id) {
        Obj.id = generateId();
    }
    events.push(Obj);
    out.events.push(Obj);
    return out;
}

ops.delete =  function(id) {
    var data = _.filter(events, function(elem){
        if(elem.id !== id) {
            return true;
        }
    });
    events = data;
}

ops.update= function(Obj) {
    var out = {};
    ops.delete(Obj.id);
    events.push(Obj);
    events = _.indexBy(events, function(Obj){
        return Number(Obj.id); 
    });
    //delete Obj.id;
    out.event = Obj;
    out.users = [];
    return out;
}

function generateId() {
    var Obj = events[events.length-1];
    return (Obj.id+1);
}

module.exports = ops;
