/**
 *
 *  Music.js
 *
 */

module.exports = function(mongoose) {
  var schema = new mongoose.Schema({

      "title": {
        type: String,
        required: true
      },
      "artist": {
        type: String
      },
      "album": {
        type: String
      },
      "track": {
        type: String
      },
      "composer": {
        type: String
      },
      "genre":{
        type: String
      },
      "year": {
        type: String
      },
      "encoder": {
        type: String
      },
      "filePath": {
        type: String
      },
      "mimeType": {
        type: String
      },
      "filename": {
        type: String,
        require: true,
        index: { unique: true }
      },
      size: {
        require: true,
        type: Number
      },
      "fileType": {
        type: String
      },
      "art": {
        "small": {
          type: String
        },
        "medium": {
          type: String
        },
        "large": {
          type: String
        },
        "extralarge": {
          type: String
        },
        "mega": {
          type: String
        }
      }
    }
  );
  return mongoose.model('music', schema);
};
