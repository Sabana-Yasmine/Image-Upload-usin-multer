// const express = require("express");
// const app = express();
// const bodyParser = require("body-parser");
// const cors = require("cors");

// const mongoose = require("mongoose");
// const multer = require ("multer");

// const port = 8000;

// const ImageModel = require("./imageModel");

// app.use(cors())
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));

// mongoose.connect("mongodb://127.0.0.1:27017/image-upload",{
//     useNewUrlParser : true,
//     useUnifiedTopology : true
// })
// .then((data)=>{
//     console.log("Database Connected");
// })
// .catch((error)=>{
//     console.log(error.message);
// });

// //Set storage

// const Storage = multer.diskStorage({
//     destination : 'uploads',
//     filename: (req, file, cb) => {
//         cb(null, file.originalname);
//     },
// });

// const upload = multer({
//     storage:Storage
// }).single('testImage')

// app.get("/", (req,res) => {
//     res.send("upload file");
// });

// app.post('/upload',(req,res) => {
//     upload(req,res,(err) => {
//         if(err){
//             console.log(err)
//         }
//         else{
//             const newImage = new ImageModel({
//                 name: req.body.name,
//                 image :{ 
//                     data : req.file.filename,
//                     contentType : 'image/jpg'
//                 }
//             })
//             newImage.save()
//             .then(() => res.send("successfully uploaded"))
//             .catch((err) => console.log(err));
//         }
//     })
// })

// app.listen(port, ()=> {
//     console.log(`successfully running at http://localhost:${port}`);
// })

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const port = 5000;
const fs = require("fs");
const imageModel = require("./imageModel");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(
    'mongodb://127.0.0.1:27017/imageUpload',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("connected successfully"))
  .catch((err) => console.log("it has an error", err));


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/", upload.single("testImage"), (req, res) => {
  const saveImage =  imageModel({
    name: req.body.name,
    img: {
      data: fs.readFileSync("uploads/" + req.file.filename),
      contentType: "image/png",
    },
  });
  saveImage
    .save()
    .then((res) => {
      console.log("image is saved");
    })
    .catch((err) => {
      console.log(err, "error has occur");
    });
    res.send('image is saved')
});


app.get('/',async (req,res)=>{
  const allData = await imageModel.find()
  res.json(allData)
})

app.listen(port, () => {
  console.log("server running successfully");
});
