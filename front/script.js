console.log('hello world');

const ipc = require('electron').ipcRenderer;
const { shell } = require('electron');
const { exec } = require('child_process');


function commandeTerminal(){

    let cmd = 'ls -l';

    exec(cmd, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
    });

}



function openLink(url){
    shell.openExternal(url);
}


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