import axios from "axios";
import VacanciesModel from "../models/vacancies.js";
import mongoose from "mongoose";

const API_URL = "https://api.hh.ru/vacancies";

export const getAllVacancies = async (req, res) => {
  try {
    const response = await VacanciesModel.find();
    if (!response) {
      return res.status(404).json({ message: "Нет данных" });
    }
    res.json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Произошла ошибка" });
  }
};

export const getVacanciesByName = async (req, res) => {
  try {
    const name = req.body.text;
    const response = await axios.get(API_URL, {
      params: {
        text: name,
        per_page: 2,
      },
    });
    const vacancies = response.data.items;
    if (!vacancies) {
      return res.status(404).json({ message: "Нет таких вакансий" });
    }
    vacancies.forEach(async (vacancie) => {
      //   const tempId = new mongoose.Types.ObjectId(inputId: Number(vacancie.id));
      const test = await VacanciesModel.findById(Number(vacancie.id)).exec();
      console.log(vacancie.id);
      console.log(test);
      if (test) {
        return;
      } else {
        const doc = new VacanciesModel({
          _id: vacancie.id,
          name: vacancie?.name,
          city: vacancie.area?.name,
          employment: vacancie.employment?.name,
          salary_from: vacancie.salary?.from,
          salary_to: vacancie.salary?.to,
        });
        const vacancieOne = await doc.save();
      }
    });
    const data = await VacanciesModel.find({ name: name });
    if (!data) {
      return res.status(404).json({ message: "Нет таких вакансий" });
    }
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Произошла ошибка" });
  }
};
