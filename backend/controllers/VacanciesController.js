import VacanciesModel from "../models/vacancies.js";
import {
  fetchVacanciesFromAPI,
  updateVacancies,
  getFilteredVacancies,
} from "../services/VacanciesService.js";

export const getAllVacancies = async (req, res) => {
  try {
    const vacancies = await VacanciesModel.find();
    res.json(vacancies.length ? vacancies : { message: "Нет данных" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

export const getVacanciesByName = async (req, res) => {
  try {
    const {
      text: nameVacancy,
      salary_from: salaryFindFrom,
      salary_to: salaryFindTo,
    } = req.body;

    const vacancies = await fetchVacanciesFromAPI(nameVacancy);
    await updateVacancies(vacancies);

    const filteredVacancies = await getFilteredVacancies(
      nameVacancy,
      salaryFindFrom,
      salaryFindTo
    );
    res.json(filteredVacancies.length ? filteredVacancies : { message: "нет" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

export const getNames = async (req, res) => {
  try {
    const vacancies = await VacanciesModel.find({}, "name");
    const names = vacancies.map(({ name }) => ({ value: name, label: name }));
    res.json(names);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
