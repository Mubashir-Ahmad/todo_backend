import sendtoken from "../middleware/jwt.js";
import User from "../model/userModel.js";
class userController{
    static signup = async (req,res) =>{
        const{name,email,password} =req.body;
        try {
            // Check Existing Email
            const existingEmail = await User.findOne({ email: email });
            if (existingEmail)
              return res.json({ message: "Email already Exists", success: false });
      
            const result = await User.create({
                userName:name,email:email,password:password
            });
            res.status(200).json({ user: result, success: true });
    } catch (error) {
      return res.json({ message: error, success: false });
    }
    }
    static login = async (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        console.log(req.body)
        if (!email || !password) {
          return res.json({ message: "Fields Can't be null", success: false });
        }
        try {
          const user = await User.findOne({ email }).select("+password");
          if (!user) {
            return res
              .status(401)
              .json({ message: "Invalid email or password", success: false });
          }
          if(user.isActive == false)
          {
             return res
              .status(500)
              .json({ message: "Cannot login contact adminstration", success: false });
          }
          const ispasswordmatched = await user.comparePassword(password);
          console.log('ooii',ispasswordmatched);
          if (!ispasswordmatched) {
            return res
              .status(401)
              .json({ message: "Invalid email or password", success: false });
          }
          // res.status(200).json({success:true,user:user });
          sendtoken(user, 200, res);
        } catch (error) {
          console.log(error);
          res.json({ message: "Something went Wrong", success: false });
        }
      };
}
export default userController;