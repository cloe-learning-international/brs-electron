var AutoLaunch = require('auto-launch');

var brsElectronAutoLauncher = new AutoLaunch({
    name: 'BRS-Electron',
    path: '/release-builds/release-builds/BRS-Electron-win32-ia32/BRS-Electron.exe',
});

brsElectronAutoLauncher.enable();

//minecraftAutoLauncher.disable();


brsElectronAutoLauncher.isEnabled()
.then(function(isEnabled){
    if(isEnabled){
        return;
    }
    brsElectronAutoLauncher.enable();
})
.catch(function(err){
    // handle error
});
