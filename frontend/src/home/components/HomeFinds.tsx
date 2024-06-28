import styles from "./HomeFinds.module.css";

type HomeFindsProps = {
  vacancies: inVacancy[];
};
interface inVacancy {
  _id: string;
  name: string;
  city: string;
  employment: string;
  salary_from: string;
  salary_to: string;
}

const HomeFinds: React.FC<HomeFindsProps> = ({ vacancies }) => {
  return (
    <div className={styles.bg}>
      {vacancies.map((vacancy) => {
        return (
          <div className={styles.block}>
            <h4>{vacancy.name}</h4>
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
      })}
    </div>
  );
};

export default HomeFinds;
