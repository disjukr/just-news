import electron from 'electron';
const { app, BrowserWindow } = electron;
electron.hideInternalModules();

console.log('hello, electron');
app.exit(0);
