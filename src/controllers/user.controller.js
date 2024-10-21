import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {User} from "../models/user.model.js"

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if user alredy exists : username , email
  //check for image , check for avatar
  // upload then to cloudinary , avatar
  // create user object - create entry in db
  // remove password and refresh token feild from response
  // return res

  const { username, fullname, email, password } = req.body;
  console.log("email: ", email);

  // this step is to check valtdation one by one username , fullname , email, password

  /*
  if (fullname ==="") {
     throw new ApiError( 400,"fullname id required");
   }
     */

  // we can check validation in one single steps !!!

  if (
    [username, fullname, email, password].some((feild) => feild?.trim() === "")
  )
  {
    throw new ApiError(400 , "All fields are required")
  }

   const existedUser = User.findOne({
    $or : [{ username }, { email }]
  })
  if(existedUser){
    throw new ApiError(409 , "User with email or username alredt exists")
  }
});

export { registerUser };
