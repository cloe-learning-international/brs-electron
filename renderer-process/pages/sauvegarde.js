console.log("home.js from renderer-process")

const {ipcRenderer} = require('electron')

// Tell main process to start the soft when the button is clicked
const aumscan4LuxeBtn = document.getElementById('sauvegarde-aumscan4-luxe')
aumscan4LuxeBtn.addEventListener('click', () => {
  ipcRenderer.send('sauvegarde-aumscan4-luxe')
  console.log("sauvegarde-aumscan4-luxe")
})

// Tell main process to start the soft when the button is clicked
const aumscan4Btn = document.getElementById('sauvegarde-aumscan4')
aumscan4Btn.addEventListener('click', () => {
  ipcRenderer.send('sauvegarde-aumscan4')
  console.log("sauvegarde-aumscan4")
})

// Tell main process to start the soft when the button is clicked
const aumscan3Btn = document.getElementById('sauvegarde-aumscan3')
aumscan3Btn.addEventListener('click', () => {
  ipcRenderer.send('sauvegarde-aumscan3')
  console.log("sauvegarde-aumscan3")
})

// Tell main process to start the soft when the button is clicked
const cardiaumNaturoBtn = document.getElementById('sauvegarde-cardiaum-naturo')
cardiaumNaturoBtn.addEventListener('click', () => {
  ipcRenderer.send('sauvegarde-cardiaum-naturo')
  console.log("sauvegarde-cardiaum-naturo")
})

// Tell main process to start the soft when the button is clicked
const cardiaumOrientBtn = document.getElementById('sauvegarde-cardiaum-orient')
cardiaumOrientBtn.addEventListener('click', () => {
  ipcRenderer.send('sauvegarde-cardiaum-orient')
  console.log("sauvegarde-cardiaum-orient")
})
