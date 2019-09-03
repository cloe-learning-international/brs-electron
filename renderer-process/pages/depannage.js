console.log("depannage.js from renderer-process")
const {ipcRenderer} = require('electron')

var modal_succes = document.getElementById('toggle-modal-depanage-internet-error');
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

// Tell main process to download team viewr when demo button is clicked
const downloadTeamViewrBtn = document.getElementById('download-team-viewr')

downloadTeamViewrBtn.addEventListener('click', () => {
  	if(navigator.onLine){
  		ipcRenderer.send('download-team-viewr')
  		console.log('download team viewr');
	   
	    var url = "https://get.teamviewer.com/v14/en/bioresonance?fbclid=IwAR3vDVFatIJ6KfqEwS2iRsGWKNpMVVDJ51Eum0Htb6PIHKOtXsjfpMAF-ek";
	    //console.log("++++++++++++++", url)
	    document.getElementById("external-page").innerHTML='<webview src="'+url+'"></webview>'
	    // Afficher la bonne page
	    document.getElementById("external-page").hidden = false;
	    // Cacher les autres pages
	    document.getElementById("home").hidden = true;
	    document.getElementById("about").hidden = true;
	    document.getElementById("sauvegarde").hidden = true;
	    document.getElementById("aide").hidden = true;
	    document.getElementById("depannage").hidden = true;
	    document.getElementById("comptabilite").hidden = true;
   }else{
    	modal_succes.click();
   }
})