import mongoose from "mongoose";

const VacanciesSchema = new mongoose.Schema({
  name: { type: String },
  city: { type: String },
  employment: { type: String },
  salary_from: { type: String },
  salary_to: { type: String },
});

export default mongoose.model("Vacansies", VacanciesSchema);
