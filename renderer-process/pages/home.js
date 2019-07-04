console.log("home.js from renderer-process")

const {ipcRenderer} = require('electron')

// Tell main process to start the soft when the button is clicked
const aumscan4LuxeBtn = document.getElementById('aumscan4-luxe')
aumscan4LuxeBtn.addEventListener('click', () => {
  ipcRenderer.send('demarrer-aumscan4-luxe')
  console.log("demarrer-aumscan4-luxe")
})

// Tell main process to start the soft when the button is clicked
const aumscan4Btn = document.getElementById('aumscan4')
aumscan4Btn.addEventListener('click', () => {
  ipcRenderer.send('demarrer-aumscan4')
  console.log("demarrer-aumscan4")
})

// Tell main process to start the soft when the button is clicked
const aumscan3Btn = document.getElementById('aumscan3')
aumscan3Btn.addEventListener('click', () => {
  ipcRenderer.send('demarrer-aumscan3')
  console.log("demarrer-aumscan3")
})

// Tell main process to start the soft when the button is clicked
const cardiaumNaturoBtn = document.getElementById('cardiaum-naturo')
cardiaumNaturoBtn.addEventListener('click', () => {
  ipcRenderer.send('demarrer-cardiaum-naturo')
  console.log("demarrer-cardiaum-naturo")
})

// Tell main process to start the soft when the button is clicked
const cardiaumOrientBtn = document.getElementById('cardiaum-orient')
cardiaumOrientBtn.addEventListener('click', () => {
  ipcRenderer.send('demarrer-cardiaum-orient')
  console.log("demarrer-cardiaum-orient")
})
