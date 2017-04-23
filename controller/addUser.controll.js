var mongoose = require('mongoose');
/////////////////////////////////// Admin Account ///////////////////////////////////////////////
var Schema = mongoose.Schema;
var addUserSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    firstName: String,
    lastName: String,
    Position: String,
    floor: String,
    date: {
        type: Date,
        default: Date.now()
    }
}, {
    collection: 'addUser'
});
var addUser = mongoose.model('addUser', addUserSchema);
exports.insert = function(req, res, next) {
    var dateTime = new Date();
    var item = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        Position: req.body.Position,
        floor: req.body.floor,
    };

    var data = new addUser(item);
    data.save()

    res.redirect('/show');
};


exports.show = function(req, res, next) {
    addUser.find({}, function(err, response) {
        if (err) {
            return next(err);
        } else {

            res.render('showUser', {
                items: response
            });
        }
        console.log("show User");
    });
};

exports.delete = function(req, res, next) {
    var id = req.param('id');
    addUser.findByIdAndRemove(id).exec();
    console.log("delete ID")
    res.redirect('/show');
};

exports.updateOf = function(req, res) {
    addUser.update({
        username: req.param('username')
    }, {
        $set: {
            password: req.body.password,
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            Position: req.body.Position,
            floor: req.body.floor,
        }
    }, function(err, user) {
        if (err) return handleError(err);
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify(user));
        console.log(user);
        console.log('OK');
    });
};

exports.showJson = function(req, res) {
    addUser
        .find()
        .populate('File')
        .sort({
            date: -1
        })
        .exec(function(err, addUser) {
            if (err) return handleError(err);
            console.log('The creator is %s', addUser);
            // prints "The creator is Aaron"
            res.json(addUser);
        });
}

var addroomSchema = mongoose.Schema({
    Roomtype: String,
    Roomname: String,
    detail: String,
    Support: Number,
    floor: Number,
    Officer: String,
}, {
    collection: 'addroom'
});

var addroom = mongoose.model('addroom', addroomSchema);

exports.insertroom = function(req, res, next) {
    var dateTime = new Date();
    var item = {
        Roomtype: req.body.Roomtype,
        Roomname: req.body.Roomname,
        detail: req.body.detail,
        Support: req.body.Support,
        Officer: req.body.Officer,
        floor: req.body.floor,
    };
    var data = new addroom(item);
    data.save()
    res.redirect('/showR');
};

exports.showR = function(req, res, next) {
    addroom.find({}, function(err, response) {
        if (err) {
            return next(err);
        } else {
            res.render('showRoom', {
                items: response
            });
        }
        console.log("show User");
    });
};

exports.getRoom = function(req, res) {
    var roomtypes = req.param('Roomtype');
    var days = req.param('day');
    var time = req.param('time');
    var unum = req.param('num');

    addroom
        .find({
            Roomtype: roomtypes,
            //    Support: {$gte: req.param('num')}
        }).exec(function(err, findroom) {
            if (err) {
                return handleError(err);
            } else {
                console.log('Show', findroom);
                res.json(findroom);
            };
        });
    confirmRRS.find({
        Confirmdate: days,
        times: time
    }).exec(function(err, findroom2) {
        if (err) {
            return handleError(err);
        } else {
            console.log('Show', findroom2);
            res.json(findroom2);
        };
    });

};

exports.deleteR = function(req, res, next) {
    var id = req.param('rid');
    addroom.findByIdAndRemove(id).exec();
    console.log("delete ID")
    res.redirect('/showR');
};

exports.showJsonROOM = function(req, res) {
    addroom
        .find({
            _id: req.param('id')
        })
        .populate('File')
        .sort({
            date: -1
        })
        .exec(function(err, addroom) {
            if (err) return handleError(err);
            console.log('The creator is %s', addroom);
            res.json(addroom);
        });
};

///////////////////////User Mobile////////////////////////////////////////

var SUserSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: String,
    email: String,
    Name: String,
    faculty: String,
    working: String,
    SID: String,
    tel: String,
    blackList: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now()
    }
}, {
    collection: 'SUser'
});
var SUser = mongoose.model('SUser', SUserSchema);

exports.insertUser = function(req, res) {
    var item = {
        Name: req.body.Name,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        SID: req.body.SID,
        faculty: req.body.faculty,
        tel: req.body.tel,
        working: req.body.working
    };
    var data = new SUser(item);
    data.save(function(err) {
        if (err) return handleError(err);
    });
    res.send(item);
};

exports.updateUsers = function(req, res) {
    SUser.update({
        username: req.param('username')
    }, {
        $set: {
            Name: req.body.Name,
            password: req.body.password,
            email: req.body.email,
            SID: req.body.SID,
            faculty: req.body.faculty,
            tel: req.body.tel
        }
    }, function(err, user) {
        if (err) return handleError(err);
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify(user));
        console.log(user);
        console.log('OK');
    });
};

exports.showUser = function(req, res, next) {
    SUser.find({}, function(err, response) {
        if (err) {
            return next(err);
        } else {

            res.render('#', {
                items: response
            });
        }
        console.log("ShowUSerLOG");
    });

};

exports.deleteUser = function(req, res, next) {
    var id = req.body.id;
    SUser.findByIdAndRemove(id).exec();
    console.log("delete ID")
    res.redirect('/SUser');
};


exports.showJsonUser = function(req, res) {
      SUser
        .findOne({_id:req.params.id})
        .exec(function(err, SUser) {
            if (err) return handleError(err);
            console.log('The creator is %s', SUser);
            res.json(SUser);
        });
};

exports.showSuser = function(req, res, next) {
    SUser.find({}, function(err, response) {
        if (err) {
            return next(err);
        } else {

            res.render('showUser', {
                items: response
            });
        }
        console.log("show User");
    });
};

exports.getLogin = function(req, res) {
    SUser
        .findOne({
            username: req.param('username')
        })
        .exec(function(err, ulogin) {
            if (err) {
                return handleError(err);
            } else {
                console.log('Show', ulogin);
                res.json(ulogin);
            };
        });
};

//////////////////////////////// BlackList ////////////////////////////////////
exports.showBL = function(req, res, next) {
    SUser.find({
        blackList: true
    }, function(err, response) {
        if (err) {
            return next(err);
        } else {

            res.render('blacklist', {
                items: response
            });
        }
        console.log("show User");
    });
};
exports.removeBlacklist = function(req, res, next) {
    var id = req.param('id');

SUser.update({
      username: id}, {
        $set: { blackList: false
        }}, function (err, user) {
      if (err) return handleError(err);
      res.redirect('/showBL');
    });
};

exports.showJsonBL = function(req, res) {
  SUser.find()
        .populate('File')
        .sort({
            date: -1
        })
        .exec(function(err, BLUser) {
            if (err) return handleError(err);
            console.log('The creator is %s', BLUser);
            // prints "The creator is Aaron"
            res.json(BLUser);
        });
};

exports.addbl = function(req, res, next) {
  SUser.update({
        username: req.body.id}, {
          $set: { blackList: true
          }}, function (err, user) {
        if (err) return handleError(err);
    res.redirect('/showBL');
  });
};

////////////////////////////////////// ConfirmedRRS /////////////////////////////////////////////
var ConfirmedRRSSchema = mongoose.Schema({
    username: String,
    User: String,
    times: String,
    RoomId: String,
    roomname: String,
    confirmCheck: {
        type: Boolean,
        default: false
    },
    Confirmdate: String,
}, {
    collection: 'confirmRRS'
});
var confirmRRS = mongoose.model('confirmRRS', ConfirmedRRSSchema);

exports.insertRRS = function(req, res, next) {
    var dateTime = new Date();
    var item = {
        username: req.body.username,
        User: req.body.User,
        times: req.body.times,
        RoomId: req.body.RoomId,
        Roomname: req.body.Roomname,
        Confirmdate: req.body.Confirmdate
    };
    var data = new confirmRRS(item);
    data.save();
    console.log(data);
};

exports.deleteRRS = function(req, res, next) {
    var _id = req.param('id');
    confirmRRS.findByIdAndRemove(_id).exec();
    console.log("delete ID")
};

exports.showJsonRRS = function(req, res) {
    confirmRRS
        .find({
            username: req.param('username')
        })
        .populate('File')
        .sort({
            date: -1
        })
        .exec(function(err, confirmRRS) {
            if (err) return handleError(err);
            console.log('The creator is %s', confirmRRS);
            res.json(confirmRRS);
        });
}
