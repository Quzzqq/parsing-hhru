import express from "express";
import cors from "cors";
import {
  getAllVacancies,
  getVacanciesByName,
} from "./controllers/VacanciesController.js";
import mongoose from "mongoose";

mongoose
  .connect(
    "mongodb+srv://admin:wwwwww@cluster0.t54d0pj.mongodb.net/parsing_hhru?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("DB ok");
  })
  .catch((err) => {
    console.log("error DB");
  });

const app = express();
app.use(express.json());
app.use(cors());

app.get("/vacancies", getAllVacancies);

app.post("/vacancies", getVacanciesByName);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Ok");
});
