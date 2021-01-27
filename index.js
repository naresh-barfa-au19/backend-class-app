const express = require("express");
const bodyParser = require("body-parser");

const { ClassModel } = require("./database");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get("/", async (req, res) => {
  const getData = await ClassModel.find({});
  res.status(200).send({ getData });
});

app.get("/filterData", async (req, res) => {
  const title = req.query.title;
  const description = req.query.description;
  const typeClass = req.query.typeClass;
  const startTime = req.query.startTime;
  const endTime = req.query.endTime;
  const filterData = await ClassModel.find({
    $or: [
      { title: title },
      {
        description: description,
      },
      {
        typeClass: typeClass,
      },
      {
        startTime: startTime,
      },
      {
        endTime: endTime,
      },
    ],
  });
  res.status(200).send({ filterData });
});

app.post("/classData", async (req, res) => {
  try {
    const classData = req.body;
    const newData = new ClassModel(classData);
    const dataDoc = await newData.save();
    res.status(200).send({ dataDoc });
  } catch (err) {
    res.status(400).send({ msg: err });
  }
});

app.get("/future-classes", async (req, res) => {
  const currDate = new Date();
  const filtredData = await ClassModel.find({
    startTime: { $gte: currDate },
  });
  res.status(200).send([filtredData]);
});

app.listen(4000, console.log("server running at port : 4000"));
