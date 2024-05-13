export const convertPostDate = (createdAtDate) => {
  let createdDate = new Date(createdAtDate);
  let currentDate = new Date();
  let diff = currentDate - createdDate;
  let seconds = diff / 1000;
  let minutes = seconds / 60;
  let hours = minutes / 60;
  let days = hours / 24;
  let weeks = days / 7;
  let months = weeks / 4;
  let years = months / 12;
  if (seconds < 60) return Math.floor(seconds) + "s";
  if (minutes < 60) return Math.floor(minutes) + "m";
  if (hours < 24) return Math.floor(hours) + "h";
  if (days < 7) return Math.floor(days) + "d";
  if (weeks < 4) return Math.floor(weeks) + "w";
  if (months < 12) return Math.floor(months) + "m";
  return Math.floor(years) + "y";
};
