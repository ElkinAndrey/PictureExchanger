import React from "react";
import classes from "./PaginationBar.module.css";

/**Получить массив от начального числа до конечного прибавляя по единице */
const getMas = (start, end) => {
  let mas = [];
  for (let i = start; i <= end; i++) {
    mas.push(i);
  }
  return mas;
};

/**Получить начальное значение массива */
const getStart = (min, max, page, centerCount) => {
  if (page >= max - centerCount - 2) return max - 2 * centerCount - 2;
  if (page - centerCount - min - 1 >= 0) return page - centerCount;
  return min + 1;
};

/**Получить конечное значение массива */
const getEnd = (start, min, page, centerCount) => {
  let end = start + 2 * centerCount;
  if (page - centerCount - min - 2 >= 0) return end;
  return end + 1;
};

/**Тело панели пагинации */
const Body = ({ min, max, page, setPage, children }) => {
  return (
    <div className={classes.body}>
      <SwitchLeft page={page} setPage={setPage} min={min} />
      {children}
      <SwitchRigth page={page} setPage={setPage} max={max} />
    </div>
  );
};

/**Переключатель на лево */
const SwitchLeft = ({ page, setPage, min }) => {
  return (
    <button
      className={classes.switch + " " + classes.basePage}
      onClick={() => page - 1 >= min && setPage(page - 1)}
    >
      {"<"}
    </button>
  );
};

/**Переключатель на право */
const SwitchRigth = ({ page, setPage, max }) => {
  return (
    <button
      className={classes.switch + " " + classes.basePage}
      onClick={() => page + 1 <= max && setPage(page + 1)}
    >
      {">"}
    </button>
  );
};

/**Кнопка страницы */
const ButtonPage = ({ number, page, setPage }) => {
  return (
    <button
      className={
        (number === page ? classes.selectPage : classes.page) +
        " " +
        classes.basePage
      }
      onClick={() => setPage(number)}
    >
      {number}
    </button>
  );
};

/**Троеточие (пропуск) */
const Missing = () => {
  return <div className={classes.missing + " " + classes.basePage}>...</div>;
};

/**Панель пагинации */
const PaginationBar = ({
  min = 1,
  max,
  page,
  setPage,
  centerCount = 2,
  className,
  style,
}) => {
  if (max === 0) {
    return <></>;
  } else if (centerCount * 2 + 4 < max - min) {
    let start = getStart(min, max, page, centerCount);
    let end = getEnd(start, min, page, centerCount);
    let center = getMas(start, end);

    return (
      <Body page={page} setPage={setPage} min={min} max={max}>
        <ButtonPage number={min} page={page} setPage={setPage} />

        {page - centerCount - min - 1 > 0 &&
          (page - centerCount - min - 2 <= 0 ? (
            <ButtonPage number={min + 1} page={page} setPage={setPage} />
          ) : (
            <Missing />
          ))}

        {center.map((n) => (
          <ButtonPage key={n} number={n} page={page} setPage={setPage} />
        ))}

        {page >= max - centerCount - 2 ? (
          <ButtonPage number={max - 1} page={page} setPage={setPage} />
        ) : (
          <Missing />
        )}

        <ButtonPage number={max} page={page} setPage={setPage} />
      </Body>
    );
  } else {
    let center = getMas(min, max);

    return (
      <div className={className} style={style}>
        <Body page={page} setPage={setPage} min={min} max={max}>
          {center.map((n) => (
            <ButtonPage key={n} number={n} page={page} setPage={setPage} />
          ))}
        </Body>
      </div>
    );
  }
};

export default PaginationBar;
