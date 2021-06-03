/**
 * I'm using a javascript file for convenience.
 * Remember to place this code inside a `dataviewjs` snippet on an obsidian note.
 *
 * ```dataviewjs
 * 	dv.paragraph("here goes the code");
 * ```
 *
 */

const resetHours = (date) => {
  const newDate = new Date(date);
  newDate.setHours(0);
  newDate.setMinutes(0);
  newDate.setSeconds(0);
  return newDate;
};

const getBeginOfWeek = (date) => {
  const beginOfWeek = new Date(
    date.getTime() - date.getDay() * 24 * 60 * 60 * 1000
  );
  return resetHours(beginOfWeek);
};

const currentWeek = dv
  .pages("#dailynote")
  .where((b) => b.date > getBeginOfWeek(new Date()))
  .sort((b) => b.date);

const countTimes = (collection) =>
  collection.map(() => 1).reduce((acc, current) => acc + current, 0);

const currentWeekList = currentWeek.array();
const healthyLunches = countTimes(
  currentWeekList.filter((b) => b["healthy-meals"] === "yes")
);
const readings = countTimes(
  currentWeekList.filter((b) => b["twenty-minute-reading"] === "yes")
);
const calories = countTimes(
  currentWeekList.filter((b) => b["thousand-kcal-burned"] === "yes")
);
const runnings = countTimes(
  currentWeekList.filter((b) => b["went-for-a-run"] === "yes")
);
const carings = countTimes(
  currentWeekList.filter((b) => b["self-care"] === "yes")
);

const emojify = (s) => {
  if (s === "yes") {
    return "✅";
  }

  if (s === "no" || s === null) {
    return "❌";
  }

  return s;
};

dv.table(
  [
    "Date 📆",
    "Had healthy meals 🥗",
    "Read 20 minutes 📚",
    "Burned 1000 kcal 🔥",
    "Went for a run 🏃🏼‍♂️",
    "Did some self-care 💅",
  ],
  currentWeek.map((b) =>
    [
      b.date,
      b["healthy-meals"],
      b["twenty-minute-reading"],
      b["thousand-kcal-burned"],
      b["went-for-a-run"],
      b["self-care"],
    ].map(emojify)
  )
);

dv.header(2, "Weekly report");

dv.list([
  healthyLunches + " times I had healthy lunch this week 🥗",
  readings + " times I read at least 20 minutes 📚",
  calories + " times I burned at least 1000kcal 🔥",
  runnings + " times I went for a running 🏃🏼‍♂️",
  carings + " times I did some self care 💅",
]);
