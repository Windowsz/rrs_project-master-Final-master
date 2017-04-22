var user = require('../controller/addUser.controll');


module.exports = function (app) {
app.route('/insert')
    .post(user.insert);

app.route('/updateOf/:username')
    .all(user.updateOf);

app.route('/insertroom')
    .post(user.insertroom);

app.route('/show')
    .get(user.show);

app.route('/delete/:id')
     .post(user.delete);

app.route('/showJson')
     .get(user.showJson);

app.route('/showR')
    .get(user.showR);

app.route('/deleteR/:rid')
     .post(user.deleteR);

app.route('/showJsonR/:id')
     .get(user.showJsonROOM);

app.route('/S/:Roomtype/:time/:day/:unum')
 .get(user.getRoom);

app.route('/loginPage/:username')
 .get(user.getLogin);

app.route('/insertUSer')
 .post(user.insertUser);

//app.route('/upd/:id')
// .all(user.upd);

app.route('/profile/:username')
    .all(user.updateUsers);
app.route('/removeBlacklist/:id/:bool')
    .all(user.removeBlacklist);
/*
 app.route('/showS/:id')
 .get(user.reserved);

 app.route('/showS/')
 .get();
*/

app.route('/showBL')
    .get(user.showBL);

app.route('/showUSer')
    .get(user.showUser);

app.route('/showJsonUSer')
    .get(user.showJsonUser);

app.route('/insertRRS')
    .post(user.insertRRS);

app.route('/showJsonRRS/:username')
    .get(user.showJsonRRS);

app.route('/deleteRRS/:id')
    .post(user.deleteRRS);

};
