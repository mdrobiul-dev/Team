const User = require("../models/User");

const registerUser = async (req, res) => {
     try {
        const {name, email, password} = req.body;
       
        if(!name || !email || !password) {
            return res.status(400).json({
                message : "all fields are required",
            })
        }

        const existingUser = await User.findOne({email});
         
        if(existingUser) {
          return res.status(409).json({
            message : "user already exist",
          })
        }

        const user = new User({
            name,
            email,
            password
        })

        await user.save()

        res.status(201).json({
            message : "User registered successfully",
            user : {
                id : user._id,
                name : user.name,
                email : user.email,
            },
        })

     } catch (error) {
        console.error(error)
        res.status(500).json({
            message : "server error",
        })
     }
}

module.exports = {registerUser,}