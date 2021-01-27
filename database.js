const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/class_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.once("open", function () {
  console.log("Connection Successful!");
});

const Schema = mongoose.Schema;

const ClassSchema = new Schema({
  title: {
    type: String,
    min: 4,
    max: 80,
    required: true,
  },
  description: {
    type: String,
    min: 15,
    max: 600,
  },
  maxNumberOfStudents: {
    type: Number,
    min: 1,
    max: 50,
    required: true,
  },
  typeClass: {
    type: String,
    enum: ["YOGA", "PILATES", "CARDIO"],
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
});

const ClassModel = mongoose.model("ClassModel", ClassSchema);

module.exports = { ClassModel, db };
