const Post = require("../models/Post");
const { validationResult } = require("express-validator");

module.exports = {
    getAllPosts: async (req, res) => {
        try{
            const posts = await Post.find().sort({createdAt: -1});
            res.status(200).json(posts);
        }
        catch (err){
            res.status(500).json({error: err.message});
        }
    },
    getSinglePost: async(req, res) => {
        try{
            const id = req.params.id;
            const post = await Post.findById(id);
            if (!post){
                return res.status(404).json({error: "Post not found."})
            }
            res.status(200).json(post)
        }
        catch (err){
            res.status(500).json({error: err.message})
        }
    },
    deletePost: async (req, res) => {
        try{
            const id = req.params.id;
            const deletedPost = await Post.findByIdAndDelete(id);
            
            if (!deletedPost){
                return res.status(404).json({error: "Post not found."})
            }
            res.status(200).json(deletedPost);

        }
        catch(err){
            res.status(500).json({error: err.message});
        }
    },
    createPost: async (req, res) => {
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()){
                return res.status(400).json({errors: errors.array()});
            }

            const post = new Post(req.body);
            await post.save();
            res.status(201).json(post);

        }
        catch(err){
            res.status(500).json({error: err.message});
        }
    },

    editPost: async (req, res) => {
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()){
                return res.status(400).json({errors: errors.array()});
            }

            const id = req.params.id;
            const updates = req.body;

            const updatedPost = await Post.findByIdAndUpdate(id, updates, {new: true, runValidators: true});
            // new tells mongoose to return the updated document and not the old document and the runValidators causes the schema validation to be run.

            if (!updatedPost){
                return res.status(404).json({error: "Cannot find the item with the id specified."})
            }

            res.status(200).json(updatedPost);
        
        }
        catch (err){
            res.status(500).json({error: err.message});
        }
    }



}