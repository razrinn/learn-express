const express = require("express");
const Post = require("../models/Post");

const router = express.Router();
const loginRequired = require("../middleware/loginRequired");
const { generateResponse } = require("../utils/response");


/**
 * GET ALL Posts
 */
router.get("/", async (req, res, next) => {
    try {
        const posts = await Post.find();
        res.json(generateResponse(true, "Data retrieved", posts));
    } catch (err) {
        return next({
            message: err,
            status: 500,
        });
    }
});

/**
 * GET a Post
 */
router.get("/:postId", async (req, res, next) => {
    const postId = req.params.postId;
    try {
        const post = await Post.findById(postId);
        res.json(generateResponse(true, "Data retrieved", post || {}));
    } catch (err) {
        res.json(generateResponse(true, "No such data", {}))
    }
});

/**
 * CREATE a Post
 */
router.post("/", loginRequired ,async (req, res) => {
    const { title, description } = req.body;
    try {
        const post = await Post.create({ title, description });
        res.json(generateResponse(true, "Data successfully created"));
    } catch (err) {
        res.status(400).json(err);
    }
});

/**
 * DELETE a Post
 */
router.delete("/:postId", loginRequired ,async (req, res) => {
    const postId = req.params.postId;
    try {
        const removedPost = await Post.remove({ _id: postId });
        res.json(generateResponse(true, "Data successfully removed"));
    } catch (err) {
        res.status(400).json(err);
    }
});

/**
 * UPDATE a Post
 */
router.patch("/:postId", loginRequired, async (req, res) => {
    const postId = req.params.postId;
    const newPostData = req.body;
    try {
        const updatedPost = await Post.updateOne(
            { _id: postId },
            {
                $set: newPostData,
            }
        );
        res.json(generateResponse(true, "Data successfully updated"));
    } catch (err) {}
});

module.exports = router;
