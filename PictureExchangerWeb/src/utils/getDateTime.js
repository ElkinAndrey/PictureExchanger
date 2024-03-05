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

/** Получить дату и время в виде строки */
const getDateTime = (stringData) => {
  // Пример 2024-02-13T14:31:56.2463915
  if (stringData === "" || stringData === null || stringData === undefined)
    return "";
  let mas = [];
  let newStr = "";
  for (let i = 0; i < stringData.length; i++) {
    if (
      stringData[i] === "-" ||
      stringData[i] === "T" ||
      stringData[i] === ":"
    ) {
      mas.push(newStr);
      newStr = "";
    } else if (stringData[i] === ".") {
      break;
    } else {
      newStr += stringData[i];
    }
  }
  return `${mas[2]} ${months[mas[1]]} ${mas[0]} ${mas[3]}:${mas[4]}`;
};

export default getDateTime;
