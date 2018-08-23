const {ipcRenderer} = require('electron');




let textInputElement = document.getElementById('main');

console.log('main called');

function saveText(text) {
    console.log('lg: ' + text);
    ipcRenderer.send('asynchronous-message', text);
}
// console.log(ipcRenderer.sendSync('synch-message', 'ping')); // prints "pong"



textInputElement.addEventListener('keyup', function () {
    saveText(textInputElement.value);
    if (textInputElement.value.length > 0) {
        textInputElement.classList.remove('placeholder-text');
    }
    else {
        textInputElement.classList.add('placeholder-text');
    }
});

ipcRenderer.on('asynchronous-reply', function(event, arg) {
    document.getElementById('local-saved').textContent = 'Locally ' + arg + ': ' + new Date().toLocaleTimeString();

});

ipcRenderer.on('async-main', (event, arg) => {
    console.log('main ch: ' + arg) // prints "pong"
});

ipcRenderer.on('async-textconfirm', (event, arg) => {
    console.log('text ch: ' + arg) // prints "pong"
});

ipcRenderer.on('async-fileload', (event, arg) => {
    console.log(arg);
    textInputElement.classList.remove('placeholder-text');
   textInputElement.value = arg.v1;
});