//importing modules
var express = require('express');
var app = express();
var fs = require('fs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var multer  = require('multer');
//tell server to look for static files. This tells server where to look. Public folder is created by me
app.use(express.static(__dirname + "/public"));
app.listen(3000);
console.log("Server running on port 3000");


/*
mongoose.connect('mongodb://localhost:3000/uploadedimages');
var ItemSchema = new Schema (
  { img:
      { data: Buffer, contentType: String }

  }
); var Item = mongoose.model('Item', ItemSchema);


app.use(multer({dest: './uploads/',
rename: function(fieldname,filename){
  return filename;
}

}));


app.post('/public/uploads', function(req,res) {
  var newItem = new Item();
  newItem.img.data=fs.readFileSync(req,files.userPhoto.path)
  newItem.img.contentType = 'image/jpg';
  newItem.save();
})

*/

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //this tells you where you want to save the file
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        //this limits the filetypes you can upload
      if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          var err = new Error();
          err.code = 'filetype';
          return cb(err);
      } else {
          cb (null, Date.now()  + '_' + file.originalname);
      }
    }
  })

//.single will be stored in req.file
var upload = multer({ 
    storage: storage, 
    limits: {fileSize: 100000000},
}).single('myFile') //since the uploaded filename is named myFile




app.post('/uploads', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      // A Multer error occurred when uploading.
      if (err.code === 'LIMIT_FILE_SIZE') {
          res.json({success: false, message: 'File size is too large. Max limit is 10MB'});
      } else if (err.code ==='filetype')  {
        // An unknown error occurred when uploading.
        res.json({success: false, message: 'File type is invalid. Must be .png/.jpg/.jpeg'});
      } else {
          console.log(err);
          res.json({success: false, message: 'File was not able to be uploaded'});
      } 
    } else {
        if(!req.file){
            res.json({success: false, message: "No file was selected"});
        } else {
            res.json({success: true, message: "File was uploaded!"});
        }
    }
    // Everything went fine.
  })
})




//lets node know the path of the public folder
app.use('/public', express.static('uploads'));

app.get('/uploads', function(req, res) {
  console.log("I received a get request for uploading pics");
  //res.sendFile()
});

