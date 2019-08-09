console.log("home.js from renderer-process")

const {ipcRenderer} = require('electron')
var fs = require('fs');
var path = require('path');
var progress = require('progress-stream');

const appData =  (require('electron').app || require('electron').remote.app).getPath('userData');
const cardiumPath = 'C:\\ProgramData\\Dinamika\\Database';

// Tell main process to start the soft when the button is clicked
const aumscan4LuxeBtn = document.getElementById('sauvegarde-aumscan4-luxe')
aumscan4LuxeBtn.addEventListener('click', () => {
  ipcRenderer.send('sauvegarde-aumscan4-luxe')
  console.log("sauvegarde-aumscan4-luxe")

  const pathAumscan = path.join(appData, 'Aumscan 4\\Base');
  var fileName = 'BASEUSER.FDB';

  checkDirectory('Aumscan 4', 'Base', function(path) {
    var ws = fs.createWriteStream(path.join(pathAumscan, fileName));

    var stat = fs.statSync(fileName);
    var str = progress({
        length: stat.size,
        time: 10 /* ms */
    });

    var data = {
                "glossary": {
                    "title": "example glossary",
                "GlossDiv": {
                        "title": "S",
                  "GlossList": {
                            "GlossEntry": {
                                "ID": "SGML",
                      "SortAs": "SGML",
                      "GlossTerm": "Standard Generalized Markup Language",
                      "Acronym": "SGML",
                      "Abbrev": "ISO 8879:1986",
                      "GlossDef": {
                                    "para": "A meta-markup language, used to create markup languages such as DocBook.",
                        "GlossSeeAlso": ["GML", "XML"]
                                },
                      "GlossSee": "markup"
                            }
                        }
                    }
                }
            }

    str.on('progress', function(progress) {
        console.log(progress.percentage);
        const modalLoading = document.getElementById('modal-loading-sample')
        modalLoading.style.display = 'block';
        if(progress.percentage === 100) 
          setTimeout(function () {
            modalLoading.style.display = 'none';
          }, 1000);
    });

    fs.createReadStream(fileName)
      .pipe(str)
      .pipe(fs.createWriteStream(fileName))
      .end(JSON.stringify(data));
  })
  
  
})
// Tell main process to start the soft when the button is clicked
const aumscan4LuxeBtnList = document.getElementById('sauvegarde-aumscan4-luxe-liste')
aumscan4LuxeBtnList.addEventListener('click', () => {
  ipcRenderer.send('sauvegarde-aumscan4-luxe-liste')
  console.log("sauvegarde-aumscan4-luxe-liste")

  const pathAumscanLuxe = path.join(appData, 'Roaming\\Aumscan 4\\Base');
  walkSync(pathAumscanLuxe, function(paths) {
    var paths = paths.sort(function(a, b){return b-a});
    console.log(' ++++++++++ ', JSON.stringify(paths))
  })
})


// Tell main process to start the soft when the button is clicked
const aumscan4Btn = document.getElementById('sauvegarde-aumscan4')
aumscan4Btn.addEventListener('click', () => {
  ipcRenderer.send('sauvegarde-aumscan4')
  console.log("sauvegarde-aumscan4")
})
// Tell main process to start the soft when the button is clicked
const aumscan4BtnList = document.getElementById('sauvegarde-aumscan4-liste')
aumscan4BtnList.addEventListener('click', () => {
  ipcRenderer.send('sauvegarde-aumscan4-liste')
  console.log("sauvegarde-aumscan4-liste")
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

function checkDirectory(folder1, folder2, cb) { 
  var directory = path.join(appData, folder1, folder2);
  fs.access(directory, error => {
      if (!error) {
          console.log('folder already exists')
      } else {
          fs.mkdir(path.join(appData, folder1), function() {
            fs.mkdir(directory)
          });
      }
  });
  cb(directory);
}