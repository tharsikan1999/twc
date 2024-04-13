import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.Mongo_db_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Optionally, you can add more options here
      // For example:
      // useCreateIndex: true,
      // useFindAndModify: false,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

export default connectToMongoDB;
