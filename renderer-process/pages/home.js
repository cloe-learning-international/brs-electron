console.log("home.js from renderer-process")

const {ipcRenderer} = require('electron');
var path = require("path");
var child = require('child_process').execFile;
const fs = require('fs');
rread = require('readdir-recursive');
var modal_succes = document.getElementById('toggle-modal-internet-error');
  
// Lancer par défaut cette page au lancement de l'application
document.getElementById("home").hidden = false;

// Tell main process to start the soft when the button is clicked
const aumscan4LuxeBtn = document.getElementById('demarrer-aumscan4-luxe')
aumscan4LuxeBtn.addEventListener('click', () => {
  ipcRenderer.send('demarrer-aumscan4-luxe')
  console.log("demarrer-aumscan4-luxe")

  //const folder = 'C:'; 
  const appAumscan4Luxe =  'C:\\Program Files (x86)\\Internet Explorer\\iexplore.exe';
  launchExe(appAumscan4Luxe);
  

  /*rread.file(folder, function(file) {
    var fullName = file.split('/');
    if(fullName[fullName.length - 1] === appName) {
      
      var fileTreated = file.replace(/\\\\/, /\\\\{2}/); 
      console.log(fileTreated)
      child(fileTreated, function(err, data) {
          if(err){
             console.error(err);
             return;
          }
       
          console.log(data.toString());
      });
    }
  })*/

})

// Tell main process to start the soft when the button is clicked
const aumscan4Btn = document.getElementById('demarrer-aumscan4')
aumscan4Btn.addEventListener('click', () => {
  ipcRenderer.send('demarrer-aumscan4')
  console.log("demarrer-aumscan4")
  const appAumscan4 =  'C:\\Users\\rosea\\AppData\\Roaming\\Aumscan 4\\Aumscan v4.exe';
  launchExe(appAumscan4);
})

// Tell main process to start the soft when the button is clicked
const aumscan3Btn = document.getElementById('demarrer-aumscan3')
aumscan3Btn.addEventListener('click', () => {
  ipcRenderer.send('demarrer-aumscan3')
  console.log("demarrer-aumscan3")
  const appAumscan3 =  'C:\\Program Files (x86)\\Dinamika\\Cardiaum-Naturo\\Cardiaum-Naturo.exe';
  launchExe(appAumscan3);
})

// Tell main process to start the soft when the button is clicked
const cardiaumNaturoBtn = document.getElementById('demarrer-cardiaum-naturo')
cardiaumNaturoBtn.addEventListener('click', () => {
  ipcRenderer.send('demarrer-cardiaum-naturo')
  console.log("demarrer-cardiaum-naturo")
  const appCardiumNaturo =  'C:\\Program Files (x86)\\Dinamika\\Cardiaum-Naturo\\Cardiaum-Naturo.exe';
  launchExe(appCardiumNaturo);
})

// Tell main process to start the soft when the button is clicked
const cardiaumOrientBtn = document.getElementById('demarrer-cardiaum-orient')
cardiaumOrientBtn.addEventListener('click', () => {
  ipcRenderer.send('demarrer-cardiaum-orient')
  console.log("demarrer-cardiaum-orient")
  const appCardiumOrient =  'C:\\Program Files (x86)\\Dinamika\\Cardiaum-Orient\\Cardiaum-Orient.exe';
  launchExe(appCardiumOrient);
})

// Tell main process to start the soft when the button is clicked
const ouvrirCloeAumscanBtn = document.getElementById('ouvrir-CLOEAUMSCAN')
ouvrirCloeAumscanBtn.addEventListener('click', () => {
  if(navigator.onLine){
    ipcRenderer.send('ouvrir-CLOEAUMSCAN')
    console.log("ouvrir-CLOEAUMSCAN")
    var url = "https://bioresonance.learnybox.com/formation/index/?idformation=6064";
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
// Tell main process to start the soft when the button is clicked
const ouvrirCloeCardiaumBtn = document.getElementById('ouvrir-CLOECARDIAUM')
ouvrirCloeCardiaumBtn.addEventListener('click', () => {
  if(navigator.onLine){
    ipcRenderer.send('ouvrir-CLOECARDIAUM')
    console.log("ouvrir-CLOECARDIAUM")
    var url = "https://bioresonance.learnybox.com/formation/index/?idformation=10758";
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
// Tell main process to start the soft when the button is clicked
const ouvrirCloeTqBtn = document.getElementById('ouvrir-CLOETQ')
ouvrirCloeTqBtn.addEventListener('click', () => {
  if(navigator.onLine){
    ipcRenderer.send('ouvrir-CLOETQ')
    console.log("ouvrir-CLOETQ")
    var url = "https://bioresonance.learnybox.com/formation/index/?idformation=6219";
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

// Tell main process to start the soft when the button is clicked
const ouvrirBrsFrBtn = document.getElementById('ouvrir-BRSFR')
ouvrirBrsFrBtn.addEventListener('click', () => {
  if(navigator.onLine){
    ipcRenderer.send('ouvrir-BRSFR')
    //console.log("ouvrir-BRSFR");
    var contactId = document.getElementById("input-forum-private-contactid").value;
    var url = "https://bio-resonance.fr/connexion/?contactId="+contactId;
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

// Tell main process to start the soft when the button is clicked
const ouvrirBrsEuBtn = document.getElementById('ouvrir-BRSEU')
ouvrirBrsEuBtn.addEventListener('click', () => {
  if(navigator.onLine){
    ipcRenderer.send('ouvrir-BRSEU')
    //console.log("ouvrir-BRSEU")
    var contactId = document.getElementById("input-web-official-contactid").value;
    var url = "https://bio-resonance.eu/?contactId="+contactId;
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

function launchExe(appName) {
  child(appName, function(err, data) {
      if(err) throw err;   
      console.log(data.toString());
  });
}