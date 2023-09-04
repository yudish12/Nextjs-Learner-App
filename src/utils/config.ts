import mongoose from "mongoose";
import jwt from "jsonwebtoken";

export const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;

    connection.on("connect", () => {
      console.log("MongoDB connected Successfully");
    });

    connection.on("error", (err) =>
      console.log("mongodb connection error" + err)
    );
  } catch (error) {
    console.log("Something Went Wrong!!");
    console.log(error);
  }
};

export const signToken = (obj: any) => {
  return jwt.sign({ obj }, process.env.TOKEN_SECRET!, {
    expiresIn: "30d",
  });
};
