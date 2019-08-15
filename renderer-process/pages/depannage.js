console.log("depannage.js from renderer-process")
const {ipcRenderer} = require('electron')
//
// Tell main process to desactivate windows update when demo button is clicked
const desactivateWindowsBtn = document.getElementById('desacivate-windows-update')

desactivateWindowsBtn.addEventListener('click', () => {
  	ipcRenderer.send('desacivate-windows-update')
  	console.log('desactivate windows update');
	//child_process.exec("start cmd.exe /K reg ADD HKLM\\SYSTEM\\CurrentControlSet\\Services\\WaaSMedicSvc /v Start /t REG_DWORD /d 4 /f");

	const spawn = require( 'child_process' ).spawnSync,
	vbs = spawn( 'cscript.exe', [ 'renderer-process/vbs/desctivate_update.vbs', 'one' ] );

	// console.log( stderr: ${vbs.stderr.toString()} );
	// console.log( stdout: ${vbs.stdout.toString()} );
	// console.log( status: ${vbs.status} );

	var modal_succes = document.getElementById('toggle-modal-update');
	modal_succes.click();
})