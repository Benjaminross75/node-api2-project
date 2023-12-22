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

postRouter.post('/', (req, res)=>{
    const postBody = req.body;
    if(!postBody.title || !postBody.contents){
        res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    } else {
        Posts.insert(postBody)
        .then(({id}) =>{
            return Posts.findById(id)
        })
        .then(newPost =>{
            res.status(201).json(newPost)
        })
        .catch(err =>{
            res.status(500).json({
                message: "There was an error while saving the post to the database"
            })
        })
    }
})

postRouter.put('/:id', (req, res)=>{
    const postBody = req.body;
    if(!postBody.title || !postBody.contents){
        res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    } else {
        Posts.findById(req.params.id)
        .then(post =>{
            if(!post){
                res.status(404).json({
                    message: "The post with the specified ID does not exist"
                })
            } else{
                 return Posts.update(req.params.id, postBody)
            }
        })
        .then(data =>{
            if(data){
                return Posts.findById(req.params.id)
            }
        })
        .then(post =>{
            res.json(post)
        })
        .catch(err =>{
            res.status(500).json({
                message: "The post information could not be modified"
            })
        })
    }
})

postRouter.delete('/:id', async (req, res)=>{
 try{
    const doesIdExist = await Posts.findById(req.params.id)
    if(!doesIdExist){
        res.status(404).json({
            message: "The post with the specified ID does not exist"
        })
    } else{
         await Posts.remove(req.params.id)
          res.json(doesIdExist)

    }

 } catch(err){
    res.status(500).json({
        message: "The post could not be removed",
        err: err.message
    })
 }
})



module.exports = postRouter
