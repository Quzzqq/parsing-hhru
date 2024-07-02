import { IGroupOption, inVacancy } from "./interfaces";

export type HomeFooterProps = {
  setCntVacancies: (cntVacancies: number) => void;
  setVacancies: (vacancies: inVacancy[]) => void;
  cntVacancies: number;
  setDisplayedVacancies: (displayedVacancies: inVacancy[]) => void;
  setCurrentPage: (currentPage: number) => void;
  currentPage: number;
  displayedVacancies: inVacancy[];
  vacancies: inVacancy[];
};

export type HomeHeaderProps = {
  setVacancies: (vacancies: inVacancy[]) => void;
  optionsVacancies: IGroupOption[];
};

export type HomeFindsProps = {
  vacancies: inVacancy[];
  setDisplayedVacancies: (displayedVacancies: inVacancy[]) => void;
  setCurrentPage: (currentPage: number) => void;
  currentPage: number;
  displayedVacancies: inVacancy[];
};
