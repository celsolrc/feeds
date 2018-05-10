var mongo = require('mongodb');

var connMongoDB = function(){
    var db = new mongo.Db('dbFeeds',
                new mongo.Server('mongodb://testeapp:%testeApp001%@ds117590.lab.com', 17590,
                {}), {});

                return db;
}

module.exports = function() {
    return connMongoDB;
}

/*
var mongo = require('mongodb');

var connMongoDB = function(){
    var mongoClient = mongo.MongoClient;
    var url = 'mongodb://testeapp:%testeApp001%@ds117590.lab.com:17590/my_blog_feed';

    mongoClient.connect(url, function(err, db){

        if (err)
        {
            
        }

    })
}*/