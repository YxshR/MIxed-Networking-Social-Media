import jwt from "jsonwebtoken"

export const verifyToken = async (res, req, next) => {
    try {
        let token = res.header("Authorization")

        if(!token) {
            return res.status(403).send("Access Denied")
        }

        if(token.startsWith("Bearer ")) {
            token =token.slice(7, token.length).trimLeft()
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified
        next()

        
    } catch (error) {
        res.status(500).json({ Error : error.message})
    }
}