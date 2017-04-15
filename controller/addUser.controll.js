var mongoose = require('mongoose');
/////////////////////////////////////////// Pic upload ////////////////////////////////////////
/*var fs = require('fs');
var mongoose = require('mongoose');
router.all('/upload',function(req,res){
     var dirname = require('path').dirname(__dirname);
     var filename = req.files.file.name;
     var path = req.files.file.path;
     var type = req.files.file.mimetype;

     var read_stream =  fs.createReadStream(dirname + '/' + path);

     var conn = req.conn;
     var Grid = require('gridfs-stream');
     Grid.mongo = mongoose.mongo;

     var gfs = Grid(conn.db);

     var writestream = gfs.createWriteStream({
        filename: filename
    });
     read_stream.pipe(writestream);
});
*/
/////////////////////////////////// Admin Account ///////////////////////////////////////////////
var Schema = mongoose.Schema;
// var mongoose = require('mongoose'),
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
/*
exports.updateUser = function(req, res, next) {
    var id = req.param('id');
    addUser.findByIdAndUpdate(
      id,
      password: req.param('password'),
      email: req.param('email'),
      firstName: req.param('firstName'),
      lastName: req.param('lastName'),
      Position: req.param('Position'),
      floor: req.param('floor'),
    ).exec();
    console.log("update ID")
    res.redirect('/show');
};
*/
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
/*
exports.gets = function(req, res){
  addroom.findOne({}).
};
*/
exports.getRoom = function(req, res) {
    var roomtypes = req.param('Roomtype');
    var days = req.param('day');
    var time = req.param('time');
//    var unum = req.param('num');

    addroom
        .find({
            Roomtype: roomtypes,
          //  Support: {$gte: req.param('num')}
        }).exec(function(err, findroom) {
            if (err) {
                return handleError(err);
            } else {
                console.log('Show', findroom);
                res.json(findroom);
            };
        });
  /*  confirmRRS.find({
      Confirmdate : days,
      times : time
    }).exec(function(err, findroom) {
        if (err) {
            return handleError(err);
        } else {
            console.log('Show', findroom);
            res.json(findroom);
        };
    });
*/
};

exports.deleteR = function(req, res, next) {
    var id = req.param('rid');
    addroom.findByIdAndRemove(id).exec();
    console.log("delete ID")
    res.redirect('/showR');
};

exports.showJsonROOM = function(req, res) {
    addroom
        .find()
        .populate('File')
        .sort({
            date: -1
        })
        .exec(function(err, addroom) {
            if (err) return handleError(err);
            console.log('The creator is %s', addroom);
            // prints "The creator is Aaron"
            res.json(addroom);
        });
};



// exports.getSupport = function (req, res) {
//     addRoom
//     .find({
//             Support: req.param('Support')
//         })
//     .exec(function (err, supports) {
//       if (err) {return handleError(err);}
//       else{
//               console.log('Show', supports);
//       res.json(supports);
//     };
//   });
// }


///////////////////////User Login ////////////////////////////////////////

var SUserSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    Name: String,
    faculty: String,
    working: String,
    SID: String,
    tel: String,
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
    var name = req.body.name;
    var password = req.body.password;
    var faculty = req.body.faculty;
    var tel = req.body.tel;
    var sid = req.body.sid;
    var email = req.body.email;
    SUser.update({
        username: req.param('username')
    }, {
        $set: {
            Name: name,
            faculty: faculty,
            tel: tel,
            SID: sid,
            email: email,
            password: password
        }
    }, function(err, user) {
        if (err) return handleError(err);
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
        .find()
        .populate('File')
        .sort({
            date: -1
        })
        .exec(function(err, SUser) {
            if (err) return handleError(err);
            console.log('The creator is %s', SUser);
            // prints "The creator is Aaron"
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

//////////////////////////////// BL ////////////////////////////////////

var BlackListSchema = mongoose.Schema({
    FLName: String,
    SID: String,
    date: {
        type: Date,
        default: Date.now()
    }
}, {
    collection: 'BLUser'
});
var BLUser = mongoose.model('BLUser', BlackListSchema);

exports.insertBL = function(req, res, next) {
    var dateTime = new Date();
    var item = {

        FLName: req.body.FLName,
        SID: req.body.SID,
        // var  date = new Date();
    };

    var data = new BLUser(item);
    data.save()
    res.redirect('/showBL');
};

exports.showBL = function(req, res, next) {
    BLUser.find({}, function(err, response) {
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

exports.deleteBL = function(req, res, next) {
    var id = req.body.id;
    BLUser.findByIdAndRemove(id).exec();
    console.log("delete ID")
    res.redirect('/showBL');
};

exports.showJsonBL = function(req, res) {
    BLUser
        .find()
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
}
////////////////////////////////////// ConfirmedRRS /////////////////////////////////////////////
var ConfirmedRRSSchema = mongoose.Schema({
    User: String,
    times: String,
    RoomId: String,
    Confirmdate: String,
}, {
    collection: 'confirmRRS'
});
var confirmRRS = mongoose.model('confirmRRS', ConfirmedRRSSchema);

exports.insertRRS = function(req, res, next) {
    var dateTime = new Date();
    var item = {
        User: req.body.User,
        times: req.body.times,
        RoomId: req.body.RoomId,
        Confirmdate: req.body.Confirmdate
    };
    var data = new confirmRRS(item);
    data.save();
    console.log(data);
};
/*
exports.deleteRRS = function(req, res, next) {
      var _id = req.param.('id');
        confirmRRS.findByIdAndRemove(_id).exec();
        console.log("delete ID")
};
*/
exports.showJsonRRS = function(req, res) {
    confirmRRS
        .find()
        .populate('File')
        .sort({
            date: -1
        })
        .exec(function(err, confirmRRS) {
            if (err) return handleError(err);
            console.log('The creator is %s', confirmRRS);
            // prints "The creator is Aaron"
            res.json(confirmRRS);
        });
}
/*
 exports.showRRS = function(req, res, next) {
      confirmRRS.findOne({id : req.param('id')}, function(err, response) {
        if (err) {
          return next(err);
        } else {

          res.render('QR', {items: response});
        }
        console.log("QR_User");
      });
};

*/

exports.reserved = function(req, res) {
    console.log(req.body._id);
    confirmRRS.findByIdAndUpdate(req.body._id, {
        $push: {
            reserved: {
                from: req.body.from,
                to: req.body.to
            }
        }
    }, {
        safe: true,
        new: true
    }, function(err, room) {
        if (err) {
            res.send(err);
        } else {
            res.json(room);
        }
    });
}
