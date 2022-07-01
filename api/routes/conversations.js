const router = require("express").Router();
const { Router } = require("express");
const Conversation = require("../models/conversation");
const { find } = require("../models/message");

//NEW CONVERSATION
router.post("/", async (req, res) => {
    const newConversation =  new Conversation({
        members : [req.body.senderId, req.body.receiverId],
    });

    try{
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    }
    catch(err){
        res.status(500).json(err);
    }
});

//GET CONVERSATIONS OF USER
router.get("/:userId", async (req,res) => {
    try{
        const conversations = await Conversation.find({
            members : { $in : [req.params.userId] }
        });
        res.status(200).json(conversations);
    }
    catch(err){
        res.status(500).json(err);
    }
});

//GET CONVERSATION BETWEEN TWO USERS
router.get("/find/:firstUserId/:secondUserId", async (req,res) => {
    try{
        const conversation = await Conversation.findOne({
            members : { $all : [req.params.firstUserId, req.params.secondUserId] }
        });
        res.status(200).json(conversation);
    }
    catch(err){
        res.status(500).json(err);
    }
});


module.exports = router;