import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import HomeHeader from "./components/HomeHeader";
import HomeFinds from "./components/HomeFinds";
import instance from "../instance";
import HomeFooter from "./components/HomeFooter";

interface inVacancy {
  _id: string;
  name: string;
  city: string;
  employment: string;
  salary_from: string;
  salary_to: string;
}

export default function Home() {
  const [vacancies, setVacancies] = useState<inVacancy[]>([]);
  console.log(vacancies);
  useEffect(() => {
    const data = async () => {
      try {
        const response: { data: inVacancy[] } = await instance.get(
          "/vacancies"
        );
        setVacancies(response.data);
      } catch (err) {}
    };
    data();
  }, [vacancies]);
  return (
    <div className={styles.block}>
      <HomeHeader setVacancies={setVacancies} />
      <HomeFinds vacancies={vacancies} />
      <HomeFooter />
      <div className={styles.header}></div>
    </div>
  );
}
