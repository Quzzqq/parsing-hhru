import axios from "axios";
import VacanciesModel from "../models/vacancies.js";

const API_URL = "https://api.hh.ru/vacancies";

export const fetchVacanciesFromAPI = async (nameVacancy) => {
  try {
    const response = await axios.get(API_URL, {
      params: { text: nameVacancy },
    });
    return response.data.items || [];
  } catch (error) {
    console.error("Ошибка при запросе к HH.ru:", error);
    throw new Error("Ошибка при получении вакансий");
  }
};

export const updateVacancies = async (vacancies) => {
  try {
    const updatePromises = vacancies.map((vacancie) =>
      VacanciesModel.findOneAndUpdate(
        { _id: vacancie.id },
        {
          _id: vacancie.id,
          name: vacancie.name,
          city: vacancie.area?.name,
          employment: vacancie.employment?.name,
          salary_from: vacancie.salary?.from,
          salary_to: vacancie.salary?.to,
        },
        { upsert: true, new: true }
      )
    );
    return await Promise.all(updatePromises);
  } catch (error) {
    console.error("Ошибка обновления вакансий:", error);
    throw new Error("Ошибка обновления вакансий");
  }
};

export const getFilteredVacancies = async (name, salaryFrom, salaryTo) => {
  const filter = {};
  if (name) filter.name = name;
  if (salaryFrom !== undefined) filter.salary_from = { $gte: salaryFrom };
  if (salaryTo !== undefined) filter.salary_to = { $lte: salaryTo };
  return await VacanciesModel.find(filter);
};
