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
    const salaryFindFrom = req.body.salary_from;
    const salaryFindTo = req.body.salary_to;
    const nameVacancy = req.body.text;
    const response = await axios.get(API_URL, {
      params: {
        text: nameVacancy,
      },
    });

    if (!response) {
      return res.status(404).json({ message: "Нет таких вакансий" });
    }

    const vacancies = response.data.items;
    const updatePromises = vacancies.map(async (vacancie) => {
      try {
        const updatedVacancie = await VacanciesModel.findOneAndUpdate(
          { _id: vacancie.id },
          {
            _id: vacancie.id,
            name: vacancie?.name,
            city: vacancie.area?.name,
            employment: vacancie.employment?.name,
            salary_from: vacancie.salary?.from,
            salary_to: vacancie.salary?.to,
          },
          { upsert: true, new: true }
        );

        return updatedVacancie;
      } catch (err) {
        console.log(err);
        return null;
      }
    });

    await Promise.all(updatePromises);

    let sendVacancies;
    if (salaryFindFrom === 0 && salaryFindTo === 500000) {
      sendVacancies = await VacanciesModel.find(
        nameVacancy
          ? {
              name: nameVacancy,
            }
          : {}
      );
    } else {
      sendVacancies = await VacanciesModel.find(
        nameVacancy
          ? {
              name: nameVacancy,
              salary_from: { $gte: salaryFindFrom },
              salary_to: { $lte: salaryFindTo },
            }
          : {
              salary_from: { $gte: salaryFindFrom },
              salary_to: { $lte: salaryFindTo },
            }
      );
    }

    if (sendVacancies.length !== 0) {
      res.json(sendVacancies);
    } else {
      res.json({ name: "нет" });
    }
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
