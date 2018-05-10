var express = require('express'),
    bodyParser = require('body-parser');
MongoClient = require('mongodb').MongoClient,
    objectId = require('mongodb').ObjectId;

let app = express();
let port = 3000;

//var url = 'mongodb://testeapp:testeapp01@ds117590.lab.com:17590/my_blog_feed';
let url = 'mongodb://localhost:27017/';

let apifeed = '/apifeed';
let apipost = '/apipost';
let apipostid = '/apipost/:idfeed';

let feedColl = 'feeds';
let postColl = 'posts';


//  var db = new mongodb.Db('dbFeeds',
//                  new mongodb.Server(,
//                  17590,{}),
//                  {});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(3000);

app.get('/', function (req, res) {
    res.send({ msg: 'Ok' });
});

//FeedCollections
//POST
app.post(apifeed, function (req, res) {

    var dados = req.body;

    MongoClient.connect(url, function (err, db) {

        if (err) {
            res.status(500).json({ status: 6 });
        } else if (req.body.nome == '' || req.body.url == '') {
            res.status(400).json({ status: 2 });
        } else {
            let dbo = db.db('my_blog_feed');
            let feeds = dbo.collection(feedColl);

            feeds.insert(dados, function (err, records) {
                if (err) {
                    res.status(500).json({ status: 5 });
                } else {
                    res.json({ status: 1 });
                }
                db.close();
            });
        }
    });
});

//GET
app.get(apifeed, function (req, res) {

    MongoClient.connect(url, function (err, db) {

        if (err) {
            res.status(500).json({ status: 6 });
        } else {

            let dbo = db.db('my_blog_feed');
            let feeds = dbo.collection(feedColl);

            feeds.find().toArray(function (err, records) {
                if (err) {
                    res.status(500).json({ status: 5 });
                } else {
                    res.json({ status: 1, records });
                }
                db.close();
            });
        }
    });
});

//GET by ID
app.get(apifeed, function (req, res) {

    MongoClient.connect(url, function (err, db) {

        if (err) {
            res.status(500).json({ status: 6 });
        } else {

            let dbo = db.db('my_blog_feed');
            let feeds = dbo.collection(feedColl);

            try {
                var records = feeds.find(objectId(req.params.id)).toArray(function (err, records) {
                    if (err) {
                        res.status(500).json({ status: 5 });
                    } else if (records == '') {
                        res.status(404).json({ status: 4 });
                    } else {
                        res.json({ status: 1, records });
                    }
                    db.close();
                });
            }
            catch (e) {
                res.status(400).json({ status: 2 });
            }
        }
    });
});

//PUT sem ID (ERRO)
app.put(apifeed, function (req, res) {
    res.status(400).json({ status: 2 });
});

//PUT by ID
app.put(apifeed + '/:id', function (req, res) {

    MongoClient.connect(url, function (err, db) {

        if (err) {
            res.status(500).json({ status: 6 });
        } else {
            let dbo = db.db('my_blog_feed');
            let feeds = dbo.collection(feedColl);
            try {

                if (req.body.nome == '' || req.body.url == '') {
                    res.status(400).json({ status: 2 });
                } else {
                    feeds.update(
                        { _id: objectId(req.params.id) },
                        { $set: { nome: req.body.nome, url: req.body.url } },
                        {},
                        function (err, records) {
                            if (err) {
                                res.status(500).json({ status: 5 });
                            } else if (records == '') {
                                res.status(404).json({ status: 4 });
                            } else {
                                res.json({ status: 1 });
                            }
                            db.close();
                        });
                }
            }
            catch (e) {
                res.status(400).json({ status: 2 });
            }
        }
    });
});

//DELETE sem ID (ERRO)
app.delete(apifeed, function (req, res) {
    res.status(400).json({ status: 2 });
});
//DELETE by ID
app.delete(apifeed + '/:id', function (req, res) {

    MongoClient.connect(url, function (err, db) {

        if (err) {
            res.status(500).json({ status: 6 });
        } else {

            let dbo = db.db('my_blog_feed');
            let feeds = dbo.collection(feedColl);

            feeds.remove(
                { _id: objectId(req.params.id) },
                function (err, records) {
                    if (err) {
                        res.status(500).json({ status: 5 });
                    } else if (records == '') {
                        res.status(404).json({ status: 4 });
                    } else {
                        res.json({ status: 1 });
                    }
                    db.close();
                });
        }
    });
});

//PostsCollections
//POST sem ID do feed (ERRO)
app.post(apipost, function (req, res) {
    res.status(400).json({ status: 2, id:0 });
});
//POST
app.post(apipostid, function (req, res) {

    var dados = req.body;

    MongoClient.connect(url, function (err, db) {

        if (err) {
            res.status(500).json({ status: 6 });
        } else if (req.body.title == '' || req.body.text == ''
            || req.body.url == '' || req.body.read == ''
            || req.params.idfeed == '') {

            let dbo = db.db('my_blog_feed');
            let posts = dbo.collection(postColl);

            posts.insert(dados, function (err, records) {
                if (err) {
                    res.status(500).json({ status: 5 });
                } else {
                    res.json({ status: 1, id: records.insertedIds[0] });
                }
                db.close();
            });
        }
    });
});

//GET sem ID do feed (ERRO)
app.get(apipost, function (req, res) {
    res.status(400).json({ status: 2 });
});
//GET
app.get(apipostid, function (req, res) {

    MongoClient.connect(url, function (err, db) {

        if (err) {
            res.status(500).json({ status: 6 });
        } else {

            let dbo = db.db('my_blog_feed');
            let posts = dbo.collection(postColl);
            let query = { idfeed : objectId(req.params.idfeed) }

            posts.find(query).toArray(function (err, records) {
                if (err) {
                    res.status(500).json({ status: 5 });
                } else {
                    res.json({ status: 1, records });
                }
                db.close();
            });
        }
    });
});

//GET by ID
app.get(apipostid, function (req, res) {

    MongoClient.connect(url, function (err, db) {

        if (err) {
            res.status(500).json({ status: 6 });
        } else {

            let dbo = db.db('my_blog_feed');
            let posts = dbo.collection(postColl);
            let query = { idfeed : objectId(req.params.idfeed),
                         _id : objectId(req.params.id) }

            try {
                var records = posts.find(query).toArray(function (err, records) {
                    if (err) {
                        res.status(500).json({ status: 5 });
                    } else if (records == '') {
                        res.status(404).json({ status: 4 });
                    } else {
                        res.json({ status: 1, records });
                    }
                    db.close();
                });
            }
            catch (e) {
                res.status(400).json({ status: 2 });
            }
        }
    });
});

//PUT sem ID do feed (ERRO)
app.put(apipost, function (req, res) {
    res.status(400).json({ status: 2 });
});

//PUT sem ID (ERRO)
app.put(apipostid, function (req, res) {
    res.status(400).json({ status: 2 });
});

//PUT by ID
app.put(apipostid + '/:id', function (req, res) {

    MongoClient.connect(url, function (err, db) {

        if (err) {
            res.status(500).json({ status: 6 });
        } else {
            let dbo = db.db('my_blog_feed');
            let posts = dbo.collection(postColl);
            try {
                if (req.body.title == '' || req.body.text == ''
                    || req.body.url == '' || req.body.read == ''
                    || req.params.idfeed == '' || req.params.id == '') {
                    res.status(400).json({ status: 2 });
                } else {
                    let query = { idfeed : objectId(req.params.idfeed),
                                 _id : objectId(req.params.id) }

                    posts.update(
                        { _id: objectId(req.params.id) },
                        {
                            $set: {
                                idfeed: objectId(req.params.idfeed),
                                title: req.body.title,
                                text: req.body.url,
                                url: req.body.url,
                                read: req.body.read
                            }
                        },
                        {},
                        function (err, records) {
                            if (err) {
                                res.status(500).json({ status: 5 });
                            } else if (records == '') {
                                res.status(404).json({ status: 4 });
                            } else {
                                res.json({ status: 1 });
                            }
                            db.close();
                        });
                }
            }
            catch (e) {
                res.status(400).json({ status: 2 });
            }
        }
    });
});

//DELETE sem ID do feed (ERRO)
app.delete(apipost, function (req, res) {
    res.status(400).json({ status: 2 });
});
//DELETE ALL POSTs Feed
app.delete(apipostid, function (req, res) {
    MongoClient.connect(url, function (err, db) {

        if (err) {
            res.status(500).json({ status: 6 });
        } else {

            let dbo = db.db('my_blog_feed');
            let posts = dbo.collection(postColl);
            let query = { idfeed : objectId(req.params.idfeed)}

            posts.remove( query,
                function (err, records) {
                    if (err) {
                        res.status(500).json({ status: 5 });
                    } else if (records == '') {
                        res.status(404).json({ status: 4 });
                    } else {
                        res.json({ status: 1 });
                    }
                    db.close();
                });
        }
    });
});

//DELETE by ID
app.delete(apipostid + '/:id', function (req, res) {

    MongoClient.connect(url, function (err, db) {

        if (err) {
            res.status(500).json({ status: 6 });
        } else {

            let dbo = db.db('my_blog_feed');
            let posts = dbo.collection(postColl);
            let query = { idfeed : objectId(req.params.idfeed),
                        _id : objectId(req.params.id) }

            posts.remove( query,
                function (err, records) {
                    if (err) {
                        res.status(500).json({ status: 5 });
                    } else if (records == '') {
                        res.status(404).json({ status: 4 });
                    } else {
                        res.json({ status: 1 });
                    }
                    db.close();
                });
        }
    });
});


// Status de retorno
//
// POST
// 
// Cenário                Response Status     Response Json
// Sucesso                200 (OK)            { status : 1 }
// Parâmetros inválidos   400 (bad request)   { status : 2 }
// Duplicidade            409 (conflit)       { status : 3 }
// Erro interno           500 (internal)      { status : 5 }
// Erro conexao banco     500 (internal)      { status : 6 }

//
// GET
// 
// Cenário                Response Status     Response Json
// Sucesso                200 (OK)            { status : 1 }
// Não localizado         404 (not found)     { status : 4 }
// Erro interno           500 (internal)      { status : 5 }
// Erro conexao banco     500 (internal)      { status : 6 }

//
// PUT
// 
// Cenário                Response Status     Response Json
// Sucesso                200 (OK)            { status : 1 }
// Parâmetros inválidos   400 (bad request)   { status : 2 }
// Erro interno           500 (internal)      { status : 5 }
// Erro conexao banco     500 (internal)      { status : 6 }

//
// DELETE
// 
// Cenário                Response Status     Response Json
// Sucesso                200 (OK)            { status : 1 }
// Não localizado         404 (not found)     { status : 4 }
// Erro interno           500 (internal)      { status : 5 }
// Erro conexao banco     500 (internal)      { status : 6 }
