import mongoose from "mongoose";
//@ts-ignore
import bcrypt from "bcryptjs";

export interface UserDocument extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  isAdmin: boolean;
  forgotPasswordToken: string;
  forgotPasswordTokenExpires: Date;
  verifyToken: string;
  verifyTokenExpires: Date;
  createdAt: Date;
  updatedAt: Date;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Provide a name"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpires: Date,
    verifyToken: String,
    verifyTokenExpires: Date,
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

let User: mongoose.Model<UserDocument>;

try {
  // Check if the model 'Users' already exists
  User = mongoose.model<UserDocument>("Users");
} catch (error) {
  // If the model doesn't exist, create it
  User = mongoose.model<UserDocument>("Users", userSchema);
}

export default User;
