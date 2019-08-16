console.log("home.js from renderer-process")

const {ipcRenderer} = require('electron')
var fs = require('fs');

var path = require('path');
var progress = require('progress-stream');
const {dialog} = require('electron').remote;
var csvWriter = require('csv-write-stream');
var writer = csvWriter({sendHeaders: false}); 

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
const cardiaumNaturoBtn = document.getElementById('sauvegarde-cardiaum-naturo')
cardiaumNaturoBtn.addEventListener('click', () => {
  ipcRenderer.send('sauvegarde-cardiaum-naturo')
  console.log("sauvegarde-cardiaum-naturo")
})
// Tell main process to start the soft when the button is clicked
const cardiaumNaturoBtnList = document.getElementById('sauvegarde-cardiaum-naturo-liste')
cardiaumNaturoBtnList.addEventListener('click', () => {
  ipcRenderer.send('sauvegarde-cardiaum-naturo-liste')
  console.log("sauvegarde-cardiaum-naturo-liste")
})

// Tell main process to start the soft when the button is clicked
const cardiaumOrientBtn = document.getElementById('sauvegarde-cardiaum-orient')
cardiaumOrientBtn.addEventListener('click', () => {
  ipcRenderer.send('sauvegarde-cardiaum-orient')
  console.log("sauvegarde-cardiaum-orient")
})
// Tell main process to start the soft when the button is clicked
const cardiaumOrientBtnList = document.getElementById('sauvegarde-cardiaum-orient-liste')
cardiaumOrientBtnList.addEventListener('click', () => {
  ipcRenderer.send('sauvegarde-cardiaum-orient-liste')
  console.log("sauvegarde-cardiaum-orient-liste")
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
    header3: date.getDate()+'-'+(date.getMonth() + 1)+'-'+date.getFullYear()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
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
                  const modalLoading = document.getElementById('modal-loading-sample')
                  modalLoading.style.display = 'flex';

                  if(progress.percentage === 100) 
                    setTimeout(function () {
                      modalLoading.style.display = 'none';
                    }, 1000);
              });

              fs.readFile(source, function(err, data) { 
                  if (err) throw err;
                  else {
                    console.log(data.toString('utf8'))
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

        }
      });
    }
  })
}


function readBackupList(dbName) {
  var i = 1, deletedFiles = [];
  const modalBackupListBody = document.getElementById('modal-backup-list-body')
  modalBackupListBody.innerHTML = '';
  fs.createReadStream(backupFile)
    .pipe(csv())
    .on('data', (row) => {
        fs.access(row.path, error => {
          if(row.db === dbName && !error) {
          
            var node = document.createElement("tr");
            var nodeNumber = document.createElement("th");
            nodeNumber.innerHTML = i;
            var nodeDate = document.createElement("td");
            nodeDate.innerHTML = row.date;
            var nodePath = document.createElement("td");
            nodePath.innerHTML = row.path;
            var nodeAction = document.createElement("td");
            nodeAction.innerHTML = '<button id="remove-backup-file" data-path="'+row.path+'" onclick="removeBackup(this)""><svg class="icon"><use xlink:href="./assets/image/icons.svg#icon-trash" /></svg></button>';
            node.appendChild(nodeNumber).appendChild(nodeDate).appendChild(nodePath).appendChild(nodeAction)
            modalBackupListBody.innerHTML +=  node.innerHTML;
            i++;

            fs.access(row.path, error => {
              if(error) {
                deletedFiles.push(row.path);
              }
            })

          }
        })

    })
    .on('end', () => {
      console.log('CSV file successfully processed');
    });
}

function removeBackup(box) {
  console.log("remove-backup-file ++++ ")
  var dataPath = box.getAttribute('data-path');
  console.log("remove-backup-file ++++ ", dataPath)
  fs.unlink(dataPath, function(err, data) {
    if(!err) {
      //console.log('succès!')
      var buttonModalBackupList = document.getElementById('sauvegarde-aumscan4-liste');
      var buttonModalDeleteSucces = document.getElementById('toggle-modal-delete-file-success');
      buttonModalBackupList.click();
      buttonModalDeleteSucces.click();

    }
  })
}