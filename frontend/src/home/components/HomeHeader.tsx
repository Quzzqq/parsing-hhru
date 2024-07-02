import React, { useState } from "react";
import styles from "./HomeHeader.module.css";
import instance from "../../instance";
import Select from "react-select";
import { HomeHeaderProps } from "../../types";
import { inVacancy } from "../../interfaces";

const HomeHeader: React.FC<HomeHeaderProps> = ({
  setVacancies,
  optionsVacancies,
}) => {
  const [value, setValue] = useState<string>();
  function onChange(newValue) {
    setValue(newValue);
  }
  async function findVacancies() {
    const tempValue = value.value ? value.value : value;
    try {
      const response: { data: inVacancy[] } = await instance.post(
        "/vacancies/name",
        {
          text: tempValue,
        }
      );
      setVacancies(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  // console.log(vacancies);

  return (
    <div className={styles.block}>
      <Select
        placeholder="Введите название вакансии"
        name="dating_purpose"
        options={optionsVacancies}
        className={styles.inp}
        value={value}
        onChange={onChange}
        onInputChange={(newValue, actionMeta) => {
          if (actionMeta.action === "input-change") {
            setValue(newValue);
          }
        }}
        maxMenuHeight={130}
      />
      <button onClick={findVacancies}>Поиск</button>
    </div>
  );
};

export default HomeHeader;
