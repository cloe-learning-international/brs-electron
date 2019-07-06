console.log("home.js from renderer-process")

const {ipcRenderer} = require('electron')

// Lancer par défaut cette page au lancement de l'application
document.getElementById("home").hidden = false;

// Tell main process to start the soft when the button is clicked
const aumscan4LuxeBtn = document.getElementById('demarrer-aumscan4-luxe')
aumscan4LuxeBtn.addEventListener('click', () => {
  ipcRenderer.send('demarrer-aumscan4-luxe')
  console.log("demarrer-aumscan4-luxe")
})

// Tell main process to start the soft when the button is clicked
const aumscan4Btn = document.getElementById('demarrer-aumscan4')
aumscan4Btn.addEventListener('click', () => {
  ipcRenderer.send('demarrer-aumscan4')
  console.log("demarrer-aumscan4")
})

// Tell main process to start the soft when the button is clicked
const aumscan3Btn = document.getElementById('demarrer-aumscan3')
aumscan3Btn.addEventListener('click', () => {
  ipcRenderer.send('demarrer-aumscan3')
  console.log("demarrer-aumscan3")
})

// Tell main process to start the soft when the button is clicked
const cardiaumNaturoBtn = document.getElementById('demarrer-cardiaum-naturo')
cardiaumNaturoBtn.addEventListener('click', () => {
  ipcRenderer.send('demarrer-cardiaum-naturo')
  console.log("demarrer-cardiaum-naturo")
})

// Tell main process to start the soft when the button is clicked
const cardiaumOrientBtn = document.getElementById('demarrer-cardiaum-orient')
cardiaumOrientBtn.addEventListener('click', () => {
  ipcRenderer.send('demarrer-cardiaum-orient')
  console.log("demarrer-cardiaum-orient")
})
