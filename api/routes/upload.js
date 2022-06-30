const router = require("express").Router();
const multer = require("multer");

//UPLOAD IMAGES
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/post");   
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({storage: storage});

router.post("/", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

//UPLOAD PROFILE PICTURE
const profileImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/profileimage");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const profileImageupload = multer({storage: profileImageStorage});

router.post("/profileimage", profileImageupload.single("file"), (req, res) => {
    try {
      return res.status(200).json("Profile picture uploded successfully");
    } catch (error) {
      console.error(error);
    }
});

module.exports = router;