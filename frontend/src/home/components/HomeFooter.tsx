import instance from "../../instance";
import { inVacancy } from "../../interfaces";
import { HomeFooterProps } from "../../types";
import styles from "./HomeFooter.module.css";

const HomeFooter: React.FC<HomeFooterProps> = ({
  setCntVacancies,
  setVacancies,
  cntVacancies,
  setCurrentPage,
  vacancies,
  setDisplayedVacancies,
  displayedVacancies,
  currentPage,
}) => {
  const handlePageChange = () => {
    setCurrentPage(currentPage + 1);
  };
  return (
    <div className={styles.bg}>
      <button
        className={
          displayedVacancies.length < vacancies.length
            ? styles.btn
            : styles.btn_off
        }
        onClick={handlePageChange}
      >
        Показать еще
      </button>
    </div>
  );
};

export default HomeFooter;
