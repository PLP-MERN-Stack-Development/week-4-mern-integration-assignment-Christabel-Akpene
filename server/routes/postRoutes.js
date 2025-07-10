const express = require("express");
const { body } = require("express-validator");
const {getAllPosts, getSinglePost, deletePost, createPost, editPost} = require("../controllers/postController");
const router = express.Router();

router.get("/", getAllPosts);
router.get("/:id", getSinglePost);
router.delete("/:id", deletePost);
router.post("/", 
    [body("title").notEmpty().withMessage("Provide a title"),
    body("post").notEmpty().withMessage("Content of post is required."),
    body("post").isLength({min: 10}).withMessage("Post must be at least 10 characters long")
    ],
    createPost
);
router.put("/:id", 
    [body("title").notEmpty().withMessage("Provide a title"),
    body("post").notEmpty().withMessage("Content of post is required."),
    body("post").isLength({min: 10}).withMessage("Post must be at least 10 characters long")
    ],
    editPost
);

module.exports = router;