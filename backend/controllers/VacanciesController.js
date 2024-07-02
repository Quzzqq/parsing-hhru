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

export const getNextVacancies = async (req, res) => {
  try {
    const response = await VacanciesModel.find()
      .skip(req.body.range)
      .limit(req.body.range + 6);
    if (!response) {
      return res.status(404).json({ message: "Нет данных" });
    }
    console.log(response);
    res.json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Произошла ошибка" });
  }
};

export const getVacanciesByName = async (req, res) => {
  try {
    const name = req.body.text;
    console.log(name);
    const response = await axios.get(API_URL, {
      params: {
        text: name,
        per_page: 2,
      },
    });
    if (!response) {
      return res.status(404).json({ message: "Нет таких вакансий" });
    }

    const vacancies = response.data.items;
    const updatePromises = vacancies.map(async (vacancie) => {
      const id = vacancie.id;
      try {
        const dataResp = await VacanciesModel.findByIdAndUpdate(
          id,
          {
            _id: vacancie.id,
            name: vacancie?.name,
            city: vacancie.area?.name,
            employment: vacancie.employment?.name,
            salary_from: vacancie.salary?.from,
            salary_to: vacancie.salary?.to,
          },
          { returnDocument: "after" }
        );
        if (!dataResp) {
          const doc = new VacanciesModel({
            _id: vacancie.id,
            name: vacancie?.name,
            city: vacancie.area?.name,
            employment: vacancie.employment?.name,
            salary_from: vacancie.salary?.from,
            salary_to: vacancie.salary?.to,
          });
          await doc.save();
          return doc;
        }
        return dataResp;
      } catch (err) {
        console.log(err);
        return null;
      }
    });
    const updatedVacancies = await Promise.all(updatePromises);
    const validVacancies = updatedVacancies.filter(
      (vacancie) => vacancie !== null
    );

    if (validVacancies.length === 0) {
      return res.status(404).json({ message: "Нет таких вакансий" });
    }

    res.json(validVacancies);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Произошла ошибка" });
  }
};

export const getNames = async (req, res) => {
  try {
    const data = await VacanciesModel.find();
    if (!data) {
      res.status("404").json({ message: "Нет вакансий" });
    }
    const inf = data.map((info) => ({ value: info.name, label: info.name }));
    res.json(inf);
  } catch (err) {
    console.log(err);
  }
};
