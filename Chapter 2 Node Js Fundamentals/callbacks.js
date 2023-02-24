// const fs = require("fs");

const path = require("path");

// fs.readFile(path.join(__dirname, "text", "new.txt"), "utf-8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// fs.writeFile(
//   path.join(__dirname, "text", "writeFile.txt"),
//   "I have written using fs.writeFIle method",
//   (err) => {
//     if (err) throw err;
//     console.log("Write Complete");

//     fs.appendFile(
//       path.join(__dirname, "text", "writeFile.txt"),
//       "\nI have appended this using fs.appendFile method", //? \n gives line break
//       (err) => {
//         if (err) throw err;
//         console.log("Append Complete");

//         fs.rename(
//           path.join(__dirname, "text", "writeFile.txt"),
//           path.join(__dirname, "text", "renameFile.txt"),
//           (err) => {
//             if (err) throw err;
//             console.log("Rename Complete");
//           }
//         );
//       }
//     );
//   }
// );

// ! Since this all becomes callback hell which is a bad practice and makes code hard to read in order to solve this in JS we use async await so here will be doing the same

// * In order to do it we need to made some modifications in our fs import

const fsPromises = require("fs").promises;

const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, "text", "new.txt"),
      "utf-8"
    );
    console.log(data);
    await fsPromises.writeFile(
      path.join(__dirname, "text", "promise.txt"),
      data
    );
    await fsPromises.appendFile(
      path.join(__dirname, "text", "promise.txt"),
      "hello"
    );
    await fsPromises.rename(
      path.join(__dirname, "text", "promise.txt"),
      path.join(__dirname, "text", "Newpromise.txt")
    );
    const newData = await fsPromises.readFile(
      path.join(__dirname, "text", "newData.txt"),
      "utf-8"
    );
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
fileOps();
