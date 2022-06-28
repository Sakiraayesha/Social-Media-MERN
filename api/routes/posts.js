const router = require("express").Router();
const User = require("../models/user");
const Post = require("../models/post");

//CREATE POST
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost); 
    }
    catch(err){
        res.status(500).json(err);
    }
});

//UPDATE POST 
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
          await post.updateOne({ $set: req.body });
          res.status(200).json("Your post has been updated!");
        } 
        else {
          res.status(403).json("You can update only your post!");
        }
      } 
      catch (err) {
        res.status(500).json(err);
      }
});

//DELETE POST 
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
          await post.deleteOne();
          res.status(200).json("Your post has been deleted!");
        } 
        else {
          res.status(403).json("You can delete only your post!");
        }
      } 
      catch (err) {
        res.status(500).json(err);
      }
});

//REACT POST 
router.put("/:id/react", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.reactions.includes(req.body.userId)) {
            await post.updateOne({ $push: {reactions: req.body.userId} });
            res.status(200).json("Your liked the post!");
        } 
        else {
            await post.updateOne({ $pull: {reactions: req.body.userId} });
            res.status(403).json("Post has been disliked.");
        }
      } 
      catch (err) {
        res.status(500).json(err);
      }
});

//GET POST 
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
      } 
      catch (err) {
        res.status(500).json(err);
      }
});

//FEED POST
router.get("/feed/:userId", async (req, res) => {
    try {
      const currentUser = await User.findById(req.params.userId);
      const userPosts = await Post.find({ userId: currentUser._id });
      const friendPosts = await Promise.all(
        currentUser.followings.map((friendId) => {
          return Post.find({ userId: friendId });
        })
      );
      res.status(200).json(userPosts.concat(...friendPosts))
    } catch (err) {
      res.status(500).json(err);
    }
});

//TIMELINE POST
router.get("/timeline/:username", async (req, res) => {
  try {
    const user = await User.findOne({username: req.params.username});
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;