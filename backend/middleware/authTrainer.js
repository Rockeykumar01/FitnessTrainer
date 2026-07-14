import jwt from 'jsonwebtoken'

// Trainer authentication middleware
const authTrainer = async (req, res, next) => {
    const { dtoken } = req.headers
    if (!dtoken) {
        return res.json({ success: false, message: 'Not Authorized Login Again' })
    }
    try {
        const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET)
        req.body.trainerId = token_decode.id    // converts token into Trainer ID
        next()
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export default authTrainer;
// here decoder is used to decode the token and get the trainer ID from it. This ID is then added to the request body so that it can be used in subsequent middleware or route handlers. If the token is invalid or missing, an error message is returned.
