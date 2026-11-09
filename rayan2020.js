const fs = require("fs");

const names = [
  "file1.txt", "file2.txt", "file3.txt", "file4.txt", "file5.txt",
  "file6.txt", "file7.txt", "file8.txt", "file9.txt", "file10.txt",
];

const result = [];

names.forEach((name, i) => {
  const linesToCopy = i + 1; // קובץ מספר i+1 -> i+1 שורות

  let content;
  try {
    content = fs.readFileSync(name, "utf8");
  } catch (err) {
    console.error(`cannot open ${name}`);
    return; // מדלגים לקובץ הבא
  }

  const lines = content.split(/\r?\n/);
  // אם הקובץ מסתיים ב-\n, split מוסיף איבר ריק בסוף - מסירים אותו
  if (lines[lines.length - 1] === "") lines.pop();

  // slice לא זורק שגיאה אם יש פחות שורות מהנדרש, ופשוט מחזיר את מה שיש
  result.push(...lines.slice(0, linesToCopy));
});

fs.writeFileSync("output.txt", result.join("\n") + (result.length ? "\n" : ""));