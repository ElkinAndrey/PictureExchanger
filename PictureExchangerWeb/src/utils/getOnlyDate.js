/** Месяцы */
const months = {
  "01": "янв",
  "02": "фев",
  "03": "мар",
  "04": "апр",
  "05": "мая",
  "06": "июн",
  "07": "июл",
  "08": "авг",
  "09": "сен",
  "10": "окт",
  "11": "ноя",
  "12": "дек",
};

/** Получить дату в виде строки */
const getOnlyDate = (stringData) => {
  // Пример 2024-02-13T14:31:56.2463915
  let mas = [];
  let newStr = "";
  for (let i = 0; i < stringData.length; i++) {
    if (stringData[i] === "-") {
      mas.push(newStr);
      newStr = "";
    } else if (stringData[i] === "T") {
      mas.push(newStr);
      break;
    } else {
      newStr += stringData[i];
    }
  }
  return `${mas[2]} ${months[mas[1]]} ${mas[0]}`;
};

export default getOnlyDate;
