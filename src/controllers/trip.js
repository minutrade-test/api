var common = require("../libs/common");
var Place  = require("../models/place");
var Trip   = require("../models/trip");
module.exports = {
    list: function (req, res, next) {
        Trip.find({'user':req.user._id}).populate("from_place").populate("to_place").sort("score").sort("from_date").exec(function (err, data) {
            if (err) res.json(common.getErrorObj("query_failed"));
            res.json(common.getResultObj(data)); 

        });
    },
    listTripRating: function (req, res, next) {
        var order = 1;
        if (!common.isEmpty(req.params.order)){
            if (req.params.order.toString()=="asc"){
                order = -1;
            }
        }
        var arrParams = [
            { $group: { _id: '$to_place', total_score: { $sum: "$score" } } },
            { $sort: { "total_score": order}  },
            { $limit: 5}
        ] 
		Trip.aggregate(arrParams, function (err, data) {
	 		if (err) res.json(common.getErrorObj("query_failed"));

            Place.populate(data, { path: '_id' }, function (err, arr) {
                if (err) res.json(common.getErrorObj("query_failed"));

                for (var x=0 ; x<arr.length ; x++){
                    arr[x].place = arr[x]._id;
                    delete  arr[x]._id;
                }
                res.json(common.getResultObj(arr));
            })
 		})
	},
    update: function (req, res, next) {
        Trip.update({_id:req.body._id}, {$set:req.body}, {upsert: true}, function(err){
            if (err) res.json(common.getErrorObj("query_failed"));
            
            res.send(common.getSuccessObj());
        });
    }
};





