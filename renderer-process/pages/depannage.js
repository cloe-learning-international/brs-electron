console.log("depannage.js from renderer-process")
const {ipcRenderer} = require('electron')
const child_process = require('child_process')
//
// Tell main process to desactivate windows update when demo button is clicked
const desactivateWindowsBtn = document.getElementById('desacivate-windows-update')

desactivateWindowsBtn.addEventListener('click', () => {
  	ipcRenderer.send('desacivate-windows-update')
  	console.log('desactivate windows update');
	child_process.exec("start cmd.exe /K reg ADD HKLM\\SYSTEM\\CurrentControlSet\\Services\\WaaSMedicSvc /v Start /t REG_DWORD /d 4 /f");
})