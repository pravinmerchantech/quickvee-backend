export function createdAt(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function formatDate(inputDate) {
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
    "Dec",
  ];

  const [year, month, day] = inputDate.split("-");
  const monthName = months[parseInt(month, 10) - 1];

  // Add suffix to the day
  // let daySuffix = "th";
  // if (day === "01" || day === "21" || day === "31") {
  //   daySuffix = "st";
  // } else if (day === "02" || day === "22") {
  //   daySuffix = "nd";
  // } else if (day === "03" || day === "23") {
  //   daySuffix = "rd";
  // }

  // const formattedDate = `${parseInt(day, 10)}${daySuffix} ${monthName} ${year}`;
  const formattedDate = `${monthName} ${parseInt(day, 10)}, ${year}`;
  return formattedDate;
}
