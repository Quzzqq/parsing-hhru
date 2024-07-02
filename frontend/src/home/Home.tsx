import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import HomeHeader from "./components/HomeHeader";
import HomeFinds from "./components/HomeFinds";
import instance from "../instance";
import HomeFooter from "./components/HomeFooter";
import { inVacancy, IGroupOption } from "../interfaces";

export default function Home() {
  const [optionsVacancies, setOptionsVacancies] = useState<IGroupOption[]>();
  const [cntVacancies, setCntVacancies] = useState<number>(0);
  const [vacancies, setVacancies] = useState<inVacancy[]>([]);
  const [displayedVacancies, setDisplayedVacancies] = useState(
    vacancies.slice(0, 6)
  );
  const [currentPage, setCurrentPage] = useState<number>(0);
  const itemsPerPage = 6;

  useEffect(() => {
    const data = async () => {
      try {
        const response: { data: inVacancy[] } = await instance.get(
          "/vacancies"
        );
        setVacancies(response.data);
        setDisplayedVacancies(response.data.slice(0, 6));
      } catch (err) {
        console.log(err);
      }
    };
    const takeNames = async () => {
      try {
        const response = await instance.get("names");
        const uniqueOptions = response.data.reduce((acc, option) => {
          if (!acc.find((item) => item.value === option.value)) {
            acc.push(option);
          }
          return acc;
        }, []);
        setOptionsVacancies(uniqueOptions);
      } catch (err) {
        console.log(err);
      }
    };
    data();
    takeNames();
  }, []);
  useEffect(() => {
    setCurrentPage(0);
    setDisplayedVacancies(vacancies.slice(0, 6));
  }, [vacancies]);
  // console.log(vacancies);
  return (
    <div className={styles.block}>
      <HomeHeader
        optionsVacancies={optionsVacancies}
        setVacancies={setVacancies}
      />
      <HomeFinds
        vacancies={vacancies}
        setCurrentPage={setCurrentPage}
        setDisplayedVacancies={setDisplayedVacancies}
        currentPage={currentPage}
        displayedVacancies={displayedVacancies}
        currentPage={currentPage}
      />
      <HomeFooter
        displayedVacancies={displayedVacancies}
        setVacancies={setVacancies}
        setCntVacancies={setCntVacancies}
        cntVacancies={cntVacancies}
        setCurrentPage={setCurrentPage}
        vacancies={vacancies}
        setDisplayedVacancies={setDisplayedVacancies}
        currentPage={currentPage}
      />
      <div className={styles.header}></div>
    </div>
  );
}
