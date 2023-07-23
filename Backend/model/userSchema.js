const mongoose = require("mongoose");
const { Schema } = mongoose;
const JWT = require("jsonwebtoken");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "user name is required"],
      minlength: [3, "Name should be at least 3 characters long"],
      maxlength: [50, "Name can't exceed more than 50 character"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "user email is required"],
      unique: true, //to ensure that the same mail id is not entered twice in database
      lowercase: true,
    },
    password: {
      type: String,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpiryDate: {
      type: Date,
    },
  },
  {
    timestamps: true, //this will add createdAt and updatedAt fields to our schema which are automatically set when
  }
);

userSchema.method = {
  jwtToken() {
    return JWT.sign(
      {
        id: this._id,
        email: this.email,
      },
      process.env.SECRET,
      { expiresIn: "1h" }
    );
  },
};

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
