const {ipcMain} = require("electron");

console.log('hello world');
const ipc = require('electron').ipcRenderer;


function test(){

    console.log('test');
    ipc.send('hello');

}

function getPass(){

    let myPseudo = 'maxime'
    ipc.send('getMyVariable', myPseudo);

}



ipc.on('havePass', (event, pass) => {

    console.log('back is call me');

    console.log(pass);

    let myH2 = document.getElementById('myH2');
    myH2.innerHTML = pass;

})