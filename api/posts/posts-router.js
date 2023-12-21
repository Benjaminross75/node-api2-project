// implement your posts router here
const express = require('express')
const Posts = require('./posts-model')
const postRouter = express.Router()

postRouter.get('/', (req, res) =>{
    Posts.find()
    .then(posts =>{
        res.send(posts)
    })
    .catch(err =>{
        res.status(500).json({
            message: "The posts information could not be retrieved"
        })
    })
})

postRouter.get('/:id', (req, res)=>{
const {id} = req.params
Posts.findById(id)
.then(post =>{
    if(!post){
        res.status(404).json({
            message: "The post with the specified ID does not exist"
        })
    }else {
        res.json(post)
    }
})
.catch(err =>{
    res.status(500).json({
        message: "The post information could not be retrieved"
    })
})
})


module.exports = postRouter
