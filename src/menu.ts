import {Menu, MenuItem, dialog, BrowserWindow} from "electron";

export function menu(window: BrowserWindow) {
    return Menu.buildFromTemplate([
        new MenuItem({
            label: "&File",
            submenu: [
                {
                    label: "&Open file...",
                    click: async () => {
                        console.log("opening a file");
                        const paths = dialog.showOpenDialogSync({properties: ["openFile"]});
                        console.log(`paths: ${paths}`);
                        window.webContents.send(
                            "open-file",
                            paths
                        );
                    },
                },
                {
                    label: "Open &directory...",
                    click: async () => {
                        dialog.showOpenDialogSync({properties: ["openDirectory"]});
                    },
                },
                {
                    label: "&Quit",
                    role: "quit",
                },
            ],
        }),
    ]);
}

