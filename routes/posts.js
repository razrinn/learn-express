const express = require("express");
const Post = require("../models/Post");

const router = express.Router();

/**
 * GET ALL Posts
 */
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.status(403).json(err);
    }
});

/**
 * GET a Post
 */
router.get("/:postId", async (req, res) => {
    const postId = req.params.postId;
    try {
        const post = await Post.findById(postId);
        res.json(post);
    } catch (err) {
        res.status(403).json(err);
    }
});

router.get("/test/:postId", async (req, res) => {
    const postId = req.params.postId;
    res.json({ postId });
});

/**
 * CREATE a Post
 */
router.post("/", async (req, res) => {
    const { title, description } = req.body;
    try {
        const post = await Post.create({ title, description });
        res.json(post);
    } catch (err) {
        res.status(403).json(err);
    }
});

/**
 * DELETE a Post
 */
router.delete("/:postId", async (req, res) => {
    const postId = req.params.postId;
    try {
        const removedPost = await Post.remove({ _id: postId });
        res.json(removedPost);
    } catch (err) {
        res.status(403).json(err);
    }
});

/**
 * UPDATE a Post
 */
router.patch("/:postId", async (req, res) => {
    const postId = req.params.postId;
    const newPostData = req.body;
    try {
        const updatedPost = await Post.updateOne(
            { _id: postId },
            {
                $set: newPostData,
            }
        );
        res.json(updatedPost);
    } catch (err) {}
});

module.exports = router;
