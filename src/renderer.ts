// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

import { ipcRenderer, dialog, remote } from "electron";
import * as fs from "fs";

console.log("inside renderer");

ipcRenderer.on("open-file", (event, files) => {
  console.log(files);
  document.getElementById("file-list").innerHTML += files;
});

function addFile() {
  console.log("clicked");
  remote.dialog.showOpenDialogSync({properties: ["openFile"]});
}

document.querySelector('#add-file').addEventListener('click', () => {
  addFile();
});
