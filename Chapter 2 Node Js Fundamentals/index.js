const fs = require("fs");
const path = require("path");

// fs.readFile("./starter.txt", (err, data) => {
//   if (err) throw err;
//   console.log(data);
//   console.log(data.toString()); // To make the data readable
// });

// // I can also call it like this
// fs.readFile("./starter.txt", "utf-8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// To catch Errors
// fs.readFile("./starer.txt", "utf-8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// // Exit on Uncaught Errors
// process.on('uncaughtException', err => {
//     console.error(`There was an uncaught error: ${err} `);
//     process.exit(1);
// })

// Reading using path because without using it may not work on some operating systems

fs.readFile(path.join(__dirname, "starter.txt"), "utf-8", (err, data) => {
  if (err) throw err;
  console.log(data);
  // Calling Append as a CallBack Function
});

fs.writeFile(
  path.join(__dirname, "files", "starter.txt"),
  "Nice to meet you",
  (err) => {
    if (err) throw err;
    console.log("Write Complete");
  }
);
fs.appendFile(
  path.join(__dirname, "files", "append.txt"),
  "/nNice to meet you",
  (err) => {
    if (err) throw err;
    console.log("Append Complete");
  }
);
fs.rename(
  path.join(__dirname, "files", "append.txt"),
  path.join(__dirname, "files", "newAppend.txt"),
  (err) => {
    if (err) throw err;
    console.log("Rename Complete");
  }
);

// To Append File You must previously have the file created
fs.appendFile(
  path.join(__dirname, "files", "append.txt"),
  "/nNice to meet you",
  (err) => {
    if (err) throw err;
    console.log("Append Complete");
  }
);
