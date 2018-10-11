/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/* Create your schema for the data in the listings.json file that will define how data is saved in your database
     See https://mongoosejs.com/docs/guide.html for examples for creating schemas
     See also https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
  */
var listingSchema = new Schema({
  /* This defines the Schema for entries.  It requires that the code and name be unique fields.  All fields
    are required, and created_at and updated_at will be defined upon creation of an entry.  Code and name Area
    unique, to facilitate future queries.*/
  code: {type: String, required: true, unique: true},
  name: {type: String, required: true, unique: true},
  address: {type: String, required: true},
  coordinates: {
    latitude: {type: Number, required: true},
    longitude: {type: Number, required: true}
  },
  created_at: Date,
  updated_at: Date
});

/* Create a 'pre' function that adds the updated_at (and created_at if not already there) property
   See https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
*/
listingSchema.pre('save', function(next) {
  /* Retrieve the current date */
  var currDate = new Date();

  //The updated_at field will be updated every time that a document is added or updated
  this.updated_at = currDate;

  //This will test if the created_at field exists.  If it does, there will be no change.  If not, it will
  //add the field, because it is a new document.
  if(!this.created_at_){
    this.created_at = currDate;
  }
  next();
});

/* Use your schema to instantiate a Mongoose model */
var Listing = mongoose.model('Listing', listingSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Listing;
