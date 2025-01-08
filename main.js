const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;
function createWindow () {

    mainWindow = new BrowserWindow({
        frame: true,
        title: 'My First App',
        width: 1318,
        height: 710,
        resizable: true,
        minWidth: 577,
        minHeight: 609,
        icon: path.join(__dirname, 'assets/logo.png'),
        webPreferences: {
            preload: path.join(__dirname, 'front/preload.js'),
            webSecurity: true,
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    })

    mainWindow.setMenuBarVisibility(false);

    // mainWindow.loadURL('https://gamenium.fr')

    mainWindow.loadFile('front/main.html')

}

app.whenReady().then(() => {

    createWindow();

    console.log('App is ready');
})


/*
*
* IPC
*
* */

ipcMain.on('hello', (event) => {

    console.log('hello i m back end');

})


let myPass = 'JeSuisUnPass';

ipcMain.on('getMyVariable', (event, pseudo) => {

    console.log('Demande pris en compte de : ' + pseudo);

    /* RENVOYER AU FRONT -> variable myPass */

    event.sender.send('havePass', myPass);


    /* L'ECRIRE DANS UN FICHIER  */

    // console.log(path.join(app.getPath('appData'))); /* Connaitre son appdata */

    if (!fs.existsSync(path.join(app.getPath('appData') + '/.myFirstApp'))){

        fs.mkdir(path.join(app.getPath('appData') + '/.myFirstApp'), (err) => {
            if (err) throw err;
        })

    }

    fs.appendFile(path.join(app.getPath('appData') + '/.myFirstApp/pass.txt'), myPass, (err) => {
        if (err) throw err;
    })



})



