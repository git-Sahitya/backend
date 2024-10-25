import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudnary.js";
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if user alredy exists : username , email
  //check for image , check for avatar
  // upload then to cloudinary , avatar
  // create user object - create entry in db
  // remove password and refresh token feild from response
  // return res

  const { username,fullName, email, password } = req.body;
  //console.log("email: ", email);

  // this step is to check valtdation one by one username ,fullName , email, password

  /*
  if (fullname ==="") {
     throw new ApiError( 400,"fullname id required");
   }
     */

  // we can check validation in one single steps !!!

  if (
    [username,fullName, email, password].some((feild) => feild?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User with email or username alredt exists");
  }
   // console.log(req.files);
    
  const avatarLocalPath = req.files?.avatar[0]?.path;
 // const coverImageLocalPath = req.files?.coverImage[0]?.path;

   let coverImageLocalPath;
   if (req.files && Array.isArray(req.files.coverImage) &&  req.files.coverImage.length > 0) {
    coverImageLocalPath = req.files.coverImage[0].path
   }
  // throw a error if avatarlocalpath nbot available


  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required.");
  }

  // Now upload on cloudinary


  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  // check avatar goes are not if not then throw a error

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required.");
  }

  // create a object and enter in db

  const user = await User.create({
   fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  })

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )

 if (!createdUser) {
   throw new ApiError(500 , "something went wrong while registering the user")
 }

   return res.status(201).json(
    new ApiResponse(200, createdUser , "User registered successfully")
   )

});

export { registerUser };
