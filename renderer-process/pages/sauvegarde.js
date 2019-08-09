console.log("home.js from renderer-process")

const {ipcRenderer} = require('electron')
var fs = require('fs');

const appData =  (require('electron').app || require('electron').remote.app).getPath('userData');
const cardiumPath = 'C:\\ProgramData\\Dinamika\\Database';

// Tell main process to start the soft when the button is clicked
const aumscan4LuxeBtn = document.getElementById('sauvegarde-aumscan4-luxe')
aumscan4LuxeBtn.addEventListener('click', () => {
  ipcRenderer.send('sauvegarde-aumscan4-luxe')
  console.log("sauvegarde-aumscan4-luxe")

  //const pathAumscan = path.join(appData, 'Roaming\\Aumscan 4\\Base');
  const pathAumscan = appData + '\\Aumscan 4\\Base';

  checkDirectory(appData, 'Aumscan 4', 'Base', function(path) {
    var ws = fs.createWriteStream(pathAumscan + '\\BASEUSER.FDB');
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

    setTimeout(function () {
      ws.write(JSON.stringify(data));
      ws.end('\n');
    }, 1000);
  })
  
  
})
// Tell main process to start the soft when the button is clicked
const aumscan4LuxeBtnList = document.getElementById('sauvegarde-aumscan4-luxe-liste')
aumscan4LuxeBtnList.addEventListener('click', () => {
  ipcRenderer.send('sauvegarde-aumscan4-luxe-liste')
  console.log("sauvegarde-aumscan4-luxe-liste")

  const pathAumscanLuxe = appData+ '\\Aumscan 4\\Base';
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

function checkDirectory(root, folder1, folder2, cb) { 
  fs.access(root+'\\'+folder1+'\\'+folder2, error => {
      if (!error) {
          console.log('folder already exists')
      } else {
        console.log(root+'\\'+folder1+'\\'+folder2, ' ++++++++++++ ')
          fs.mkdir(appData + '\\' + folder1, function() {
            fs.mkdir(appData + '\\' + folder1 + '\\' + folder2, cb);
          });
      }
  });
  cb(root+'\\'+folder1+'\\'+folder2);
}
