const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

//UPDATE USER
router.put('/:id', async (req,res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }
            catch(err){
                return res.status(500).json(err);
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Acoount has been updated!");
        }
        catch(err){
            return res.status(500).json(err);
        }
    }
    else{
        return res.status(403).json("You can only update your own account!");
    }
});

//DELETE USER
router.delete('/:id', async (req,res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin){
        try{
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Acoount has been deleted!");
        }
        catch(err){
            return res.status(500).json(err);
        }
    }
    else{
        return res.status(403).json("You can only delete your own account!");
    }
});

//GET USER
router.get('/', async (req,res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try{
        const user = userId ? await User.findById(userId) : await User.findOne({username: username});
        const {password, updateAt, ...other} = user._doc;
        res.status(200).json(other);
    }
    catch(err){
        res.status(500).json(err);
    }
});

//GET FOLLOWINGS
router.get("/followings/:userId", async (req, res) => { 
    try{
        const user = await User.findById(req.params.userId);
        const followings = await Promise.all(
            user.followings.map((followingsId) => {
                return User.findById(followingsId);
            })
        );
        let followingList = [];
        followings.map((following) => {
            const { _id, username, profilePicture } = following;
            followingList.push({_id, username, profilePicture}); 
        });
        res.status(200).json(followingList);
    }
    catch(err){
        res.status(500).json(err);
    }
});

//GET FOLLOWERS
router.get("/followers/:userId", async (req, res) => { 
    try{
        const user = await User.findById(req.params.userId);
        const followers = await Promise.all(
            user.followers.map((followersId) => {
                return User.findById(followersId);
            })
        );
        let followerList = [];
        followers.map((follower) => {
            const { _id, username, profilePicture } = follower;
            followerList.push({_id, username, profilePicture}); 
        });
        res.status(200).json(followerList);
    }
    catch(err){
        res.status(500).json(err);
    }
});

//FOLLOW USER
router.put('/:id/follow', async (req,res) => {
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId); 
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push: {followers: req.body.userId}});
                await currentUser.updateOne({$push: {followings: req.params.id}});
                res.status(200).json("User has been followed!");
            }
            else{
                res.status(403).json("You already follow this user.");
            }
        }
        catch(err){
            return res.status(500).json(err);
        }
    }
    else{
        return res.status(403).json("You can't follow yourself!");
    }
});

//UNFOLLOW USER
router.put('/:id/unfollow', async (req,res) => {
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId); 
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull: {followers: req.body.userId}});
                await currentUser.updateOne({$pull: {followings: req.params.id}});
                res.status(200).json("User has been unfollowed!");
            }
            else{
                res.status(403).json("You don't follow this user.");
            }
        }
        catch(err){
            return res.status(500).json(err);
        }
    }
    else{
        return res.status(403).json("You can't unfollow yourself!");
    }
});

module.exports = router;