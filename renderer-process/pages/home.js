console.log("home.js from renderer-process")

const {ipcRenderer} = require('electron');

//timezone
var moment = require('moment-timezone');
const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
var date = moment().tz(zone).format('YYYY-MM-DD H:m:s');
//end timezone
//csv
//var fs = require('fs');
var path = require('path');
var progress = require('progress-stream');
const {dialog} = require('electron').remote;
//const elec_window = remote.getCurrentWindow()
var csvWriter = require('csv-write-stream');
var writer = csvWriter({sendHeaders: false}); 
const csv = require('csv-parser');
const source="";
const appData =  (require('electron').app || require('electron').remote.app).getPath('userData');
const file_store = path.join(appData,'Synchro','synch.csv');
const file_txt = path.join(appData,'Synchro','synch.txt');
// End csv

var path = require("path");
var child = require('child_process').execFile;
const fs = require('fs');
rread = require('readdir-recursive');
var modal_succes = document.getElementById('toggle-modal-internet-error');
  
// Lancer par défaut cette page au lancement de l'application
document.getElementById("home").hidden = false;

/*********** Start connexion inernert *******/
  if (!fs.existsSync(file_store)) { 
    if(navigator.onLine){
      makeBuck(source,date);
    }else{
      modal_succes.click();
    }
        
  } else {
    //console.log('BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB')
    var list=[];
    var count_day="";
    fs.createReadStream(file_store)
    .pipe(csv())
    .on('data', (row) => {
      list.push(row.date);
    })
    .on('end', () => {
      var d1 = new Date(list[list.length-1]);
      var d2 = new Date(date);
      var diff = dateDiff(d1, d2);
      count_day= diff.min; 
      if(navigator.onLine){
        console.log('ONNNNNNNNNNNNNNNNNN',parseInt(count_day));
        if(parseInt(count_day)>=2){
          makeBuck(source,date);
        }
      }else{
        console.log('OFFFFFFFFFFFFFFFFF',count_day);
        if(count_day>=2){
          modal_succes.click();
        }
      }  
    });  
  } 
  const close_appli = document.getElementById('no_internet')
  close_appli.addEventListener('click', ()=>{
    window.close();
  });

/*********** End connexion inernert *******/

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
      if(err)  {
        //throw err; 
        const btnModalError = document.getElementById('toggle-app-not-installed-modal-error');
        btnModalError.click();
      }  
      console.log(data.toString());
  });
}

function writeLogCSV(date, file_store){              
  writer = csvWriter({sendHeaders: false});
  writer.pipe(fs.createWriteStream(file_store, {flags: 'a'}));
  writer.write({
    header1: date,
  });
  writer.end();
}
function makeBuck(source,date){

      if (!fs.existsSync(file_store)) {
        writer = csvWriter({sendHeaders: false});
        fs.mkdir(path.join(appData, 'Synchro'), function() {
          writeLogCSV(date, file_store);
        })
        writer.pipe(fs.createWriteStream(file_store));
        writer.write({
          header1: 'date',
        });
        writer.end();
      } else {
        writeLogCSV(date, file_store);
      }
}

function dateDiff(date1, date2){
    var diff = {}                         
    var tmp = date2 - date1;
 
    tmp = Math.floor(tmp/1000);             
    diff.sec = tmp % 60;                   
 
    tmp = Math.floor((tmp-diff.sec)/60);    
    diff.min = tmp % 60;                    
 
    tmp = Math.floor((tmp-diff.min)/60);    
    diff.hour = tmp % 24;                   
     
    tmp = Math.floor((tmp-diff.hour)/24);  
    diff.day = tmp;
     
    return diff;
}