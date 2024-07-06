import React, { useState } from "react";
import styles from "./HomeHeader.module.css";
import instance from "../../instance";
import Select from "react-select";
import { HomeHeaderProps } from "../../types";
import { inVacancy } from "../../interfaces";
import ReactSlider from "react-slider";

interface ISalary {
  from: number;
  to: number;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({
  setVacancies,
  optionsVacancies,
}) => {
  const [value, setValue] = useState<string>();
  const [salary, setSalary] = useState<ISalary>({
    from: 0,
    to: 500000,
  });
  const [employ, setEmploy] = useState("any");
  function onChange(newValue) {
    setValue(newValue);
  }
  async function findVacancies() {
    const tempValue = value ? (value.value ? value.value : value) : "";
    console.log(tempValue);
    try {
      const response: { data: inVacancy[] } = await instance.post(
        "/vacancies/name",
        {
          salary_from: salary.from,
          salary_to: salary.to,
          text: tempValue,
          employ: employ,
        }
      );
      if (response.data.name === "нет") {
        setVacancies([]);
      } else setVacancies(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={styles.block}>
      <div className={styles.block_employ}>
        <p>Тип занятости</p>
        <select
          name="employ"
          className={styles.employ}
          onChange={(e) => setEmploy(e.target.value)}
        >
          <option value="Полная занятость">Полная занятость</option>
          <option value="Частичная занятость">Частичная занятость</option>
          <option value="Проектная работа/разовое задание">
            Проектная работа/разовое задание
          </option>
          <option value="Волонтерство">Волонтерство</option>
          <option value="Стажировка">Стажировка</option>
          <option value="any">Не указан</option>
        </select>
      </div>

      <div className={styles.slider_block}>
        <div className={styles.slider_main}>
          <p>Зарплата</p>
          <label>
            <ReactSlider
              name="age"
              className={styles.slider}
              thumbClassName={styles.slider_thumb}
              trackClassName="slider_track"
              onChange={(value: [number, number]) =>
                setSalary({ from: value[0], to: value[1] })
              }
              defaultValue={[salary.from, salary.to]}
              min={0}
              max={500000}
              step={10000}
              minDistance={50000}
              renderThumb={(props, state) => <div {...props}></div>}
            />
          </label>
        </div>

        {salary.from === 0 && salary.to === 500000 ? (
          <p className={styles.salary_price}>Не указана</p>
        ) : (
          <p>
            от {salary.from} до {salary.to}
          </p>
        )}
      </div>

      <Select
        placeholder="Введите название вакансии"
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
      <button onClick={findVacancies} className={styles.btn}>
        Поиск
      </button>
    </div>
  );
};

export default HomeHeader;
