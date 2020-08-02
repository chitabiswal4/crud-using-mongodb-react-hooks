const Express = require("express");
const BodyParser = require("body-parser");
const cors =require('cors');
const { Collection } = require("mongoose");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const CONNECTION_URL = 'mongodb://localhost:27017/';
const DATABASE_NAME = "contextereDB";
const COLLECTION_CONTEXT ="contexter";
const COLLECTION_BASE ="atttentions";
ObjectID = require('mongodb').ObjectID;

var app = Express();
app.use(cors());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
var database, collection;
app.post("/attention", (request, response) => {
    collection.insert(request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
});

app.get("/attention/:id", (request, response) => {
    collection.findOne({ "_id": new ObjectId(request.params.id) }, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});
	
 app.get("/attentions", (request, response) => {
    collection.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});
//update : put
// Update a attention by the id in the request
app.put("/attention/:id", (request, response)=> {
  if (!request.body) {
    return response.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = request.params.id;
  var objectId = new ObjectID(id);
  collection.replaceOne({_id:objectId}, request.body)
    .then(data => {

      if (!data) {
        response.status(404).send({
          message: `Cannot update attention with id=${id}. Maybe attention was not found!`
        });
      } else response.send({ message: "attention was updated successfully,no of recs:" + data.result.nModified});
    })
    .catch(err => {
      response.status(500).send({
        message: "Error updating attention with id=" + id
      });
    });
});
//delete :delete
// Delete a attention with the specified id in the request
app.delete("/attention/:_id", (request, response)=>
 {
    const id = request.params._id;
  
    collection.deleteOne( { "_id" : ObjectId(id) } )
      .then(data => {
        if (!data) {
          response.status(404).send({
            message: `Cannot delete attention with id=${id}. Maybe attention was not found!`
          });
        } else { 
          response.send({
            message: "attention was deleted successfully!:" + data.result.n
          });
        }
      })
      .catch(err => {
        response.status(500).send({
          message: "Could not delete attention with id=" + id
        });
      });
  });





//------------------------------------2 suns----------------------------
app.listen(6000, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true,useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection(COLLECTION_BASE);
        console.log("Connected to `" + DATABASE_NAME + COLLECTION_BASE + "`!");
    });
});
 
app.listen(8080, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true ,useUnifiedTopology: true}, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection(COLLECTION_CONTEXT);
        console.log("Connected to `" + DATABASE_NAME + COLLECTION_CONTEXT + "`!");
    });
});
 
/// test curls 
/*
curl -X POST \
    -H 'content-type:application/json' \
    -d '{"attention:"Good Morning"}' \
    http://localhost:5000/atention
1
	
curl -X GET http://localhost:8080/attentions

	
curl -X GET http://localhost:5000/attention/4b103f89403f841059524fd1
 

  


*/