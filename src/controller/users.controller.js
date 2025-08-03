import ApiError from "../utils/apiError.js"
import ApiResponse from "../utils/apiResponse.js"
import { User } from "../model/users.moel.js"
import AsyncHandler from "../utils/asyncHandler.js"

//register user
const registerUser = AsyncHandler(async (req, res) => {
    //value from frontend
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
        throw new ApiError(400, "All fields are required.");
    }

    if (!email.includes("@")) {
        throw new ApiError(401, "Email must contain '@'.");
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(409, "User with this email already exists.");
    }

    // Create new user
    const newUser = await User.create({ name, email, password });

    // Exclude sensitive fields
    const createdUser = await User.findById(newUser._id).select("-password -refreshToken");
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user.");
    }

    // Success response
    return res.status(200).json(
        new ApiResponse(200, createdUser, "User registered successfully.")
    );
});

// login user
const loginUser = AsyncHandler(async (req, res) => {
    // Get email and password from request body
    const { email, password } = req.body;
    console.log("Login attempt with :", email, password);

    return res.status(200).json(
        new ApiResponse(200, null, "Login functionality is not implemented yet.")
    )

});


export { registerUser, loginUser }