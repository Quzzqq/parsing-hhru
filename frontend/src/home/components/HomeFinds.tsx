import { useEffect, useState } from "react";
import { HomeFindsProps } from "../../types";
import styles from "./HomeFinds.module.css";

const HomeFinds: React.FC<HomeFindsProps> = ({
  vacancies,
  setCurrentPage,
  setDisplayedVacancies,
  displayedVacancies,
  currentPage,
}) => {
  const itemsPerPage = 6;
  useEffect(() => {
    const temp = currentPage * itemsPerPage;
    setDisplayedVacancies((prev) => {
      return [...prev, ...vacancies.slice(temp, temp + 6)];
    });
  }, [currentPage]);
  useEffect(() => {
    // console.log(vacancies);
  }, [vacancies]);
  return (
    <div className={styles.bg}>
      {vacancies.length !== 0 ? (
        displayedVacancies.map((vacancy) => {
          return (
            <div className={styles.block} key={vacancy._id}>
              <h4>
                <a
                  href={`https://hh.ru/vacancy/${vacancy._id}`}
                  target="_blank"
                >
                  {vacancy.name}
                </a>
              </h4>
              <hr />
              <h5 className={styles.header}>Зарплата:</h5>
              <p className={styles.p}>
                от "{vacancy.salary_from ? vacancy.salary_from : "-"}" до "
                {vacancy.salary_to ? vacancy.salary_to : "-"}"
              </p>
              <h5 className={styles.header} style={{ marginTop: "5px" }}>
                Город:
              </h5>
              <p className={styles.p}>{vacancy.city}</p>
              <h5 className={styles.header} style={{ marginTop: "5px" }}>
                Тип занятости:
              </h5>
              <p className={styles.p}>{vacancy.employment}</p>
            </div>
          );
        })
      ) : (
        <p className={styles.sad_text}>Нет вакансий</p>
      )}
    </div>
  );
};

export default HomeFinds;
