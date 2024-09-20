import Post from "../model/Post.js"
import User from "../model/User.js"


export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body
        const user = await User.findById(userId)
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath : user.userPicturePath,
            picturePath,
            like:{},
            comments: {},
        })
        await newPost.save()

        const post = await Post.find()

        res.status(201).json(post)

    } catch (error) {
        res.status(409).json({ message: error.message})
    }
}

/* READ */

export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find()
        res.status(201).json(post)
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const {userId} = req.params
        const post = await Post.find()
        res.status(201).json(post)
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}


/* Update */

export const likePost = async (req, res) => {
    try {
        const {id} = req.params
        const { userId } = req.body
        const post = await Post.findById(id)
        const isLiked = post.likes.get(userId) 

        if(isLiked){
            post.likes.set(userId, true)
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {
                like: post.likes
            },
            {
                new: true
            }
        )


        res.status(201).json(updatedPost)
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}