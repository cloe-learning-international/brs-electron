console.log("home.js from renderer-process")

const {ipcRenderer} = require('electron')
var fs = require('fs');
var path = require('path');
var os = require('os');
var progress = require('progress-stream');
var copydir = require('copy-dir');
const {dialog} = require('electron').remote;
var csvWriter = require('csv-write-stream');
var writer = csvWriter({sendHeaders: false}); 

var backupToRemovePath = '';

const csv = require('csv-parser');

const appData =  (require('electron').app || require('electron').remote.app).getPath('userData');
const cardiumPath = 'C:\\ProgramData\\Dinamika\\Database';
const backupFile = path.join(appData, 'Backup story', 'log.csv')

// Tell main process to start the soft when the button is clicked
const aumscan4LuxeBtn = document.getElementById('sauvegarde-aumscan4-luxe')
aumscan4LuxeBtn.addEventListener('click', () => {
  ipcRenderer.send('sauvegarde-aumscan4-luxe')
  console.log("sauvegarde-aumscan4-luxe")
  
})
// Tell main process to start the soft when the button is clicked
const aumscan4LuxeBtnList = document.getElementById('sauvegarde-aumscan4-luxe-liste')
aumscan4LuxeBtnList.addEventListener('click', () => {
  ipcRenderer.send('sauvegarde-aumscan4-luxe-liste')
  console.log("sauvegarde-aumscan4-luxe-liste")

})


// Tell main process to start the soft when the button is clicked
const aumscan4Btn = document.getElementById('sauvegarde-aumscan4')
aumscan4Btn.addEventListener('click', () => {
  ipcRenderer.send('sauvegarde-aumscan4');
  console.log("sauvegarde-aumscan4");
  const DB = 'aumscan4';

  const options = {
    title: "Sauvegarde",
    defaultPath: (require('electron').app || require('electron').remote.app).getPath('documents') + '/BASEUSER_' + getDateString() + '.FDB',
    buttonLabel : "sauvegarder",
    filters :[{name: 'Sauvegarde', extensions: ['FDB','fdb']}]
  }

  console.log(appData, ' ****************************** ');
  const source = path.join(appData, 'Aumscan 4', 'Base', 'BASEUSER.FDB');
  makeBackup(source, options, DB)
  
})

// Tell main process to start the soft when the button is clicked
const aumscan4BtnList = document.getElementById('sauvegarde-aumscan4-liste')
aumscan4BtnList.addEventListener('click', () => {
  ipcRenderer.send('sauvegarde-aumscan4-liste')
  console.log("sauvegarde-aumscan4-liste")

  readBackupList('aumscan4');
 
})


// Tell main process to start the soft when the button is clicked
const aumscan3Btn = document.getElementById('sauvegarde-aumscan3')
aumscan3Btn.addEventListener('click', () => {
  ipcRenderer.send('sauvegarde-aumscan3')
  console.log("sauvegarde-aumscan3")
})
// Tell main process to start the soft when the button is clicked
const aumscan3BtnList = document.getElementById('sauvegarde-aumscan3-liste')
aumscan3BtnList.addEventListener('click', () => {
  ipcRenderer.send('sauvegarde-aumscan3-liste')
  console.log("sauvegarde-aumscan3-liste")
})

// Tell main process to start the soft when the button is clicked
const cardiaumBtn = document.getElementById('sauvegarde-cardiaum')
cardiaumBtn.addEventListener('click', () => {
  ipcRenderer.send('sauvegarde-cardiaum')
  console.log("sauvegarde-cardiaum")
  console.log(os.platform(), process.env.ProgramData, path.resolve('/var/lib', (require('electron').app || require('electron').remote.app).getName()),  ' ++++++++++++++++++ ');
  
  var DB = 'cardium';

  var options = {
    title: "Sauvegarde",
    defaultPath: (require('electron').app || require('electron').remote.app).getPath('documents') + '/Database_' + getDateString(),
    buttonLabel : "sauvegarder"
  }

  var opsys =  os.platform();
  switch(opsys) {
    case "win32", "win64":
      var source = path.join(process.env.ProgramData || 'C:\\ProgramData', 'Dinamika', 'Database');
      if (fs.existsSync(source)) {
        showLoadingModal();
        makeDirectoryBackup(options, source, DB, function(response) {
          console.log(response, ' ++++++++++++++++++')
          if(response) closeLoadingModal();
        });
      } 
      else {
        document.querySelector('#global-modal-error .modal-body').innerHTML = "La base de données source n'existe pas!";
        const btnModalError = document.getElementById('toggle-global-modal-error');
        btnModalError.click();
      }
      
      break;
    case "linux":
      var source = path.join('/var/lib', 'Dinamika', 'Database');
      if (fs.existsSync(source)) {
        showLoadingModal();
        makeDirectoryBackup(options, source, DB, function(response) {
          console.log(response, ' ++++++++++++++++++')
          if(response) closeLoadingModal();
        });
      }
      else {
        document.querySelector('#global-modal-error .modal-body').innerHTML = "La base de données source n'existe pas!";
        const btnModalError = document.getElementById('toggle-global-modal-error');
        btnModalError.click();
      }
      break;
    case "darwin":
      console.log('comming soon ...')
      break;
  }
  
  
 
})
// Tell main process to start the soft when the button is clicked
const cardiaumBtnList = document.getElementById('sauvegarde-cardiaum-liste')
cardiaumBtnList.addEventListener('click', () => {
  ipcRenderer.send('sauvegarde-cardiaum-liste')
  console.log("sauvegarde-cardiaum-liste")

  readBackupList('cardium');
})

//Remove backup file
const removeBackupBtn = document.getElementById('remove-backup-file')
removeBackupBtn.addEventListener('click', () => {
  removeBackup();
})

var walkSync = function(dir, cb) {
  var files = fs.readdirSync(dir).filter(function( elm ) {
      return elm.match(/.*\.(FDB)/ig);
    });
  var paths = [];
  files.forEach(function(file) {
    console.log(file, ' ************ ')
    paths.push(file);
  });

  cb(paths);
};

function checkDirectory(root, folder1, folder2, cb) { 
  var directory = path.join(root, folder1, folder2);
  fs.access(path.join(root, folder1), error => {
      if (!error) {
          console.log('folder already exists')
          fs.mkdir(directory, cb)
      } else {
          fs.mkdir(path.join(root, folder1), function() {
            fs.mkdir(directory, cb)
          });
      }
  });
  cb(directory);
}

function getDateString() {
  const date = new Date();
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day =`${date.getDate()}`.padStart(2, '0'); 
  const hour =`${date.getHours()}`.padStart(2, '0');
  var minutes = `${date.getMinutes()}`.padStart(2, '0');
  var seconds = `${date.getSeconds()}`.padStart(2, '0');
  
  return `${year}${month}${day}${hour}${minutes}${seconds}`
}

function writeLogCSV(DB, destination, backupFile){
  var date = new Date(); 
                 
  writer = csvWriter({sendHeaders: false});
  writer.pipe(fs.createWriteStream(backupFile, {flags: 'a'}));
  writer.write({
    header1: DB,
    header2: destination,
    header3: `${date.getDate()}`.padStart(2, '0')+'-'+`${date.getMonth() + 1}`.padStart(2, '0') +'-'+date.getFullYear()+' '+`${date.getHours()}`.padStart(2, '0') +':'+`${date.getMinutes()}`.padStart(2, '0')+':'+`${date.getSeconds()}`.padStart(2, '0')
  });
  writer.end();
}

function makeBackup(source, options, DB) {
  var buttonModalError = document.getElementById('toggle-modal')

  fs.access(source, error => {
    if (error) {      
      buttonModalError.click();
      //throw error;
    } else {

      dialog.showSaveDialog(null, options, (destination) => {
        if(destination != undefined) {
          console.log(destination, ' +++++++++++++++++++++++ ');   


          // fs.copyFile(source, destination, (err) => {
          //     if (err) {
          //       throw err;
          //       console.log('Sauvegarde non effectuée!');
          //     }
          //     console.log('Sauvegarde effectuée avec succès!');
          // });
       

          fs.createWriteStream(destination);

          setTimeout(function(){ 
            fs.access(destination, error => {
              if (error) {
                throw error;
                console.log("Le dossier source n'existe pas!");
              } else {

                var stat = fs.statSync(destination);
                var str = progress({
                    length: stat.size,
                    time: 10 /* ms */
                });

                str.on('progress', function(progress) {
                    showLoadingModal();

                    if(progress.percentage === 100) closeLoadingModal();
                });

                fs.readFile(source, function(err, data) { 
                    if (err) throw err;
                    else {
                      //console.log(data.toString('utf8'))
                      fs.createReadStream(destination)
                        .pipe(str)
                        .pipe(fs.createWriteStream(destination))
                        .end(data.toString('utf8'));

                      if (!fs.existsSync(backupFile)) {
                        //console.log(backupFile, ' *******************')
                        writer = csvWriter({sendHeaders: false});
                        fs.mkdir(path.join(appData, 'Backup story'), function() {
                          console.log('xxxxxxxxxxxxx')
                          writeLogCSV(DB, destination, backupFile);
                        })
                        writer.pipe(fs.createWriteStream(backupFile));
                        writer.write({
                          header1: 'db',
                          header2: 'path',
                          header3: 'date'
                        });
                        writer.end();
                      } else {
                        writeLogCSV(DB, destination, backupFile);
                      }

                      
                    }
                    
                });
              }
            })
          }, 1000);

        }
      });
    }
  })
}


function readBackupList(dbName) {
  var i = 1, deletedFiles = [];
  const modalBackupListBody = document.getElementById('modal-backup-list-body')
  modalBackupListBody.innerHTML = '';

  
  if (!fs.existsSync(backupFile)) {
    document.querySelector('#global-modal-error .modal-body').innerHTML = "La liste de sauvegarde est vide!";
    const btnModalError = document.getElementById('toggle-global-modal-error');
    btnModalError.click();
  }
  else {

    fs.createReadStream(backupFile)
      .pipe(csv())
      .on('data', (row) => {
          fs.access(row.path, error => {
            if(row.db === dbName && !error) {
              //console.log(row, ' +++++++++++++++++++')
              var node = document.createElement("tr");
              var nodeNumber = document.createElement("th");
              nodeNumber.innerHTML = i;
              var nodeDate = document.createElement("td");
              nodeDate.innerHTML = row.date;
              var nodePath = document.createElement("td");
              nodePath.innerHTML = row.path;
              var nodeAction = document.createElement("td");
              nodeAction.innerHTML = '<button data-path="'+row.path+'" onclick="toggleRemoveBackupModal(this);"><svg class="btn-icon-trash"><use xlink:href="./assets/image/icons.svg#icon-trash" /></svg></button><button class="ml-2 btn btn-success" id="reinstall-backup-file" data-path="' + row.path + '" onclick="reinstallBackup(this)">Réinstaller</button>';
              node.appendChild(nodeNumber).appendChild(nodeDate).appendChild(nodePath).appendChild(nodeAction)
              modalBackupListBody.innerHTML +=  node.innerHTML;
              i++;

            }
          })

      })
      .on('end', () => {
        console.log('CSV file successfully processed');
        if(i===1) {
          document.querySelector('#global-modal-error .modal-body').innerHTML = "La liste de sauvegarde est vide!";
          const btnModalError = document.getElementById('toggle-global-modal-error');
          btnModalError.click();
        }
        else {
          const btnBackupList = document.getElementById('toggle-aumscan4-backup-list')
          btnBackupList.click();
        }
      });
  }
  
}

function toggleRemoveBackupModal(box) {
  const btnModalError = document.getElementById('toggle-modal-remove-backup-file');
  btnModalError.click();
  backupToRemovePath = box.getAttribute('data-path');
}

function removeBackup(box) { 
  console.log("remove-backup-file ++++ ", backupToRemovePath)
  fs.unlink(backupToRemovePath, function(err, data) {
    if(!err) {
      document.querySelector('#global-modal-success .modal-body').innerHTML = "Suppression du fichier avec succès!";
      var buttonModalBackupList = document.getElementById('toggle-aumscan4-backup-list');
      var buttonModalSucces = document.getElementById('toggle-global-modal-success');
      buttonModalBackupList.click();
      buttonModalSucces.click();
      readBackupList('aumscan4');
    }
  })
}

function reinstallBackup(box) {
  var dataPath = box.getAttribute('data-path');
  console.log("reinstall-backup-file ++++ ", dataPath)
  var date = new Date();                
  const source = path.join(appData, 'Aumscan 4', 'Base', 'BASEUSER.FDB');
  const destination = path.join(appData, 'Backup source', 'BASEUSER' + getDateString() + '.FDB');

  if (!fs.existsSync(destination)) {
    fs.mkdir(path.join(appData, 'Backup source'), function(err) {
      backupThenDeleteAndReplace(source, destination, dataPath, function(response) {
        if(response) {
          document.querySelector('#global-modal-success .modal-body').innerHTML = "Réinstallation de la sauvegarde avec succès!";
          var buttonModalBackupList = document.getElementById('toggle-aumscan4-backup-list');
          var buttonModalSucces = document.getElementById('toggle-global-modal-success');
          buttonModalBackupList.click();
          buttonModalSucces.click();
        }
      });
    })
  }
  else {
    backupThenDeleteAndReplace(source, destination, dataPath);
  }
  
}

function copy(source, destination, cb) {
  fs.createWriteStream(destination);
  fs.readFile(source, function(err, data) { 
    if (err) throw err;
    else {
      //console.log(data.toString('utf8'))
      fs.createReadStream(destination)
        .pipe(fs.createWriteStream(destination))
        .end(data.toString('utf8')); 

      cb(1);     
    }
    
  });
}

function backupThenDeleteAndReplace(source, backupPath, newSource, cb) {
  copy(source, backupPath, function(data) {
    if(data) {
      //Ecrire le chemin du nouveau sauvegarde dans la liste des sauvegardes
      writeLogCSV('aumscan4', backupPath, backupFile);
      copy(newSource, source, function(data) {
        if(data) {
          //Supprimer l'ancien sauvegarde
          fs.unlink(newSource)
          cb(1)
        }
      })
    }
  })
}

function makeDirectoryBackup(options, source, DB, cb) {
  dialog.showSaveDialog(null, options, (destination) => {
    if(destination != undefined) {
      console.log(destination, ' +++++++++++++++++++++++ ');      
      fs.mkdir(destination, function(err) {
        if(!err)
          copydir(source, destination, {
            utimes: true,  // keep add time and modify time
            mode: true,    // keep file mode
            cover: true    // cover file when exists, default is true
          }, function(err){
            if(err) throw err;
            writeLogCSV(DB, destination, backupFile);
            cb(1);
          });
      })

    }
  });
  
}

function showLoadingModal() {
  const modalLoading = document.getElementById('modal-loading-sample');
  modalLoading.style.display = 'flex';
}

function closeLoadingModal() {
  const modalLoading = document.getElementById('modal-loading-sample');
  setTimeout(function () {
    modalLoading.style.display = 'none';
  }, 1000);
}


                    

                    