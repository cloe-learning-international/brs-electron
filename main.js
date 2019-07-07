const {app, BrowserWindow, Tray, Menu, ipcMain} = require('electron');
const path = require('path');
const url = require('url');
require('electron-reload')(__dirname);
const glob = require('glob');
const {autoUpdater} = require("electron-updater");

// IFS API
var InfusionsoftRestApi = require('infusionsoft-node-sdk');
var api = new InfusionsoftRestApi.AppointmentApi()
var opts = {
  'since': "since_example", // {String} Date to start searching from ex. `2017-01-01T22:17:59.039Z`
  'until': "until_example", // {String} Date to search to ex. `2017-01-01T22:17:59.039Z`
  'limit': 56, // {Number} Sets a total of items to return
  'offset': 56 // {Number} Sets a beginning range of items to return
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
api.appointmentsUsingGET(opts, callback);

class Main {
    constructor() {
        app.on('ready', this.createWindow)
        app.on('ready', this.loadMainProcess)
        app.on('ready', function()  {
          autoUpdater.checkForUpdatesAndNotify();
        });
    }

    createWindow() {
        this.browserWindow = new BrowserWindow({
          width: 1024,
          height: 768,
          minWidth: 640,
          minHeight: 480,
          icon: path.join(__dirname, '/assets/image/petit-logo.png')
        })
        this.browserWindow.loadURL(url.format({
            pathname: path.join(__dirname, './index.html'),
            protocol: 'file:',
            slashes: true
        }))
        this.browserWindow.on('closed', () => {
            this.browserWindow = null
        })
        // on ajoute le tray
        let tray = null
        var mainWindow = this.browserWindow;
        // avoir la fenettre en plein ecran
        mainWindow.maximize();
        // ajouter le logo brs dans la barre des tâches
        this.tray = new Tray(path.join(__dirname, '/assets/image/petit-logo.png'))
        var contextMenu = Menu.buildFromTemplate([
            { label: 'Afficher', click:  function(){
                mainWindow.show();
            } },
            { label: 'Minimiser', click:  function(){
                mainWindow.hide();
            } },
            { label: 'Quitter', click:  function(){
                app.isQuiting = true;
                app.quit();
            } }
        ])
        this.tray.setToolTip('Biorésonance et Santé')
        this.tray.setContextMenu(contextMenu)
        this.tray.on('double-click',()=>{
          mainWindow.show();
        })
        mainWindow.webContents.openDevTools();

    }

    loadMainProcess() {
      const files = glob.sync(path.join(__dirname, '/main-process/**/*.js'))
      files.forEach((file) => { require(file) })
    }
}

const main = new Main()
