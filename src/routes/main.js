var router = require("express").Router();
var common = require("../libs/common");

module.exports = function(app, passport) {
    // route to test if the user is logged in or not
    router.get('/login', isLoggedIn, function (req, res) {
        res.send(req.user);
    });

    //login
    router.post('/login/client', passport.authenticate('local-login-client'),
        function (req, res) {
            res.send(req.user);
        }
    );

    // admin login
    router.post('/login/admin', passport.authenticate('local-login-admin'),
        function (req, res) {
            res.send(req.user);
        }
    );

    router.post('/logout', function(req, res) {
        req.logout();
        res.send(200);
    });

    var tripCtrl = require("../controllers/trip");
    router.get("/trip" ,isLoggedIn, tripCtrl.list);
    router.get("/trip/rating/:order" ,isAdmin , tripCtrl.listTripRating);
    router.put("/trip" ,isLoggedIn, tripCtrl.update);

    return router;
};

// route middleware to check user auth
function isLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) 
    res.send(common.getErrorObj("unauthorized"));
else
    next();
}

// route middleware to check admin user auth
function isAdmin(req, res, next) {
    if (!req.isAuthenticated()){
        res.send(common.getErrorObj("unauthorized"));
    }else{
        if (!req.user.supervisor){
            res.send(common.getErrorObj("unauthorized"));
        }else{
            next();
        }
    }
}