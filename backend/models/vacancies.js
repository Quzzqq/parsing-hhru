import mongoose from "mongoose";

const VacanciesSchema = new mongoose.Schema({
  _id: { type: String },
  name: { type: String },
  city: { type: String },
  employment: { type: String },
  salary_from: { type: Number },
  salary_to: { type: Number },
});

export default mongoose.model("Vacansies", VacanciesSchema);
