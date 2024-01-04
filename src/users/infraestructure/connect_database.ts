/* eslint-disable no-console */
import mongoose from "mongoose";

const mongoConnection = async (mongoUrl: string): Promise<void> => {
  try {
    mongoose.set("toJSON", {
      virtuals: true,
      versionKey: false,
      transform(doc, ret) {
        delete ret._id;
      }
    });

    await mongoose.connect(mongoUrl, {
      dbName: "app"
    });

    console.log("Connected to MongoDB...");
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error("An unknown error ocurred");
    }
  }
};

export default mongoConnection;
