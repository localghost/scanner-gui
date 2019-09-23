import { Menu, MenuItem, dialog, BrowserWindow } from "electron";
import * as fs from "fs";

function addPaths(window: BrowserWindow, paths: string | string[]) {
  window.webContents.send("open-file", paths);
}

export function menu(window: BrowserWindow) {
  return Menu.buildFromTemplate([
    new MenuItem({
      label: "&File",
      submenu: [
        {
          label: "&Open file...",
          click: async () => {
            console.log("opening a file");
            const path = dialog.showOpenDialogSync({
              properties: ["openFile"]
            });
            console.log(path);
            addPaths(window, path);
          }
        },
        {
          label: "Open &directory...",
          click: async () => {
            const dir = dialog.showOpenDialogSync({
              properties: ["openDirectory"]
            });
            console.log(dir);
            // addPaths(window, dir);
            await fs.readdir(dir[0], (err: Error, files: string[]) => {
              addPaths(window, files);
            });
          },
        },
        {
          label: "&Convert",
        },
        {
          label: "&Quit",
          role: "quit",
        },
      ],
    }),
  ]);
}
