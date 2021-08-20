const Validator = require('fastest-validator');
const models = require('../models');

function addPost(req, res) {
    const posts = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.image_url,
        categoryId: req.body.category_id,
        userId: 1,
    }



    const schema = {
        title: {
            type: "string",
            optional: false,
            max: "100"
        },
        content: {
            type: "string",
            optional: false,
            max: "500"
        },
    }
    models.Post.create(posts).then(result => {
        res.status(201).json({
            message: "Post createdd successfully",
            post: result
        })
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        })
    });
}


function postbyid(req, res) {
    const id = req.params.id;

    models.Post.findByPk(id).then(result => {
        if (result) {
            res.status(200).json(result);

        } else {
            res.status(500).json({
                message: "Post not found"
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!"
        })
    });
}

function index(req, res) {
    models.Post.findAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!"
        })
    });
}


function update(req, res) {
    const id = req.params.id;
    const updatedPost = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.image_url,
        categoryId: req.body.category_id
    }
    const userId = 1;
    models.Post.update(updatedPost, {
        where: {
            id: id,
            userId: userId
        }
    }).then(result => {
        res.status(200).json({
            message: "Post updated successfully",
            post: updatedPost
        });
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    })
}


function destroy(req, res) {
    const id = req.params.id;
    const userId = 1;

    models.Post.destroy({
        where: {
            id: id,
            userId: userId
        }
    }).then(result => {
        res.status(200).json({
            message: "Post deleted successfully",
            //   post: updatedPost
        })
    }).catch(error => {
        res.status(200).json({
            message: "Something went wrong",
            error: error
        });
    });


}

module.exports = {
    index: index,
    display: postbyid,
    save: addPost,
    update: update,
    destroy: destroy
}