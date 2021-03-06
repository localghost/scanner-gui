// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

import { ipcRenderer, dialog, remote, app } from "electron";
import * as fs from "fs";
import * as path from "path";

console.log("inside renderer");

ipcRenderer.on("open-file", (event, files) => {
  console.log(files);
  document.getElementById("file-list").innerHTML += files;
});

function appendFiles(paths: string[]) {
    const fileList = document.querySelector("#file-list .list");
    paths.forEach((p, index) => {
        fileList.innerHTML += `
            <li class="ripple" id="path-${index}">
                <span class="item-text">
                    ${path.basename(p)}
                    <span class="secondary-text">${p}</span>
                </span>
                <i class="icon-highlight-remove item-action"></i>
            </li>
        `;
        document.getElementById(`path-${index}`).addEventListener('click', () => removePath(`path-${index}`));
    });
}

function removePath(id: string) {
    document.getElementById(id).remove();
}

function removeFile(id: string) {
    console.log(`Removing file: ${id}`);
    document.querySelector(`#${id}`).remove();
}

function addFile() {
  console.log("clicked");
  appendFiles(remote.dialog.showOpenDialogSync({ properties: ["openFile"] }));
}

function addFolder() {
  console.log("clicked");
  appendFiles(remote.dialog.showOpenDialogSync({ properties: ["openDirectory"] }));
}

function quit() {
  remote.app.quit();
}

document.querySelector("#add-file").addEventListener("click", addFile);
document.querySelector("#add-folder").addEventListener("click", addFolder);
document.querySelector("#app-quit").addEventListener("click", quit);
