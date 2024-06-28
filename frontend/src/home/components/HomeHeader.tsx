import React, { useState } from "react";
import styles from "./HomeHeader.module.css";
import instance from "../../instance";

type HomeHeaderProps = {
  setVacancies: (vacancies: inVacancy[]) => void;
};

interface inVacancy {
  _id: string;
  name: string;
  city: string;
  employment: string;
  salary_from: string;
  salary_to: string;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ setVacancies }) => {
  const [value, setValue] = useState<string>();
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }
  async function findVacancies() {
    try {
      const response: { data: inVacancy[] } = await instance.post(
        "/vacancies",
        {
          text: value,
        }
      );
      setVacancies(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={styles.block}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className={styles.inp}
      />
      <button onClick={findVacancies}>ok</button>
    </div>
  );
};

export default HomeHeader;
