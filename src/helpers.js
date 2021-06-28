import Joi from "joi-browser";

export function formatDate(date) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  const dateArr = date.split("-");
  const day = dateArr[2];
  const month = months[parseInt(dateArr[1]) - 1];
  const year = dateArr[0];

  return `${day} ${month} ${year}`;
}

export function formatMoney(num) {
  var str = num.toString();
  return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function dateToDatabase(dateObj) {
  return `${dateObj.getFullYear()}-${
    dateObj.getMonth() + 1
  }-${dateObj.getDate()}`;
}

export function addDays(date, days) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}

export const filterOp = [
  {
    id: 1,
    txt: "Pending",
    checked: false
  },
  {
    id: 2,
    txt: "Paid",
    checked: false
  }
];
