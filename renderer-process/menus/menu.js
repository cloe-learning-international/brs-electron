console.log("menu.js from renderer-process")

const {ipcRenderer} = require('electron')

// Tell main process to start the soft when the button is clicked
const accueilBtn = document.getElementById('Accueil')
accueilBtn.addEventListener('click', () => {
  ipcRenderer.send('Accueil')
  console.log("Accueil")
})

// Tell main process to start the soft when the button is clicked
const sauvegardeBtn = document.getElementById('Sauvegarde')
sauvegardeBtn.addEventListener('click', () => {
  ipcRenderer.send('Sauvegarde')
  console.log("Sauvegarde")
})

// Tell main process to start the soft when the button is clicked
const comptabiliteBtn = document.getElementById('Comptabilite')
comptabiliteBtn.addEventListener('click', () => {
  ipcRenderer.send('Comptabilite')
  console.log("Comptabilite")
})

// Tell main process to start the soft when the button is clicked
const proposBtn = document.getElementById('Propos')
proposBtn.addEventListener('click', () => {
  ipcRenderer.send('Propos')
  console.log("Propos")
})

// Tell main process to start the soft when the button is clicked
const aideBtn = document.getElementById('Aide')
aideBtn.addEventListener('click', () => {
  ipcRenderer.send('Aide')
  console.log("Aide")
})

// Tell main process to start the soft when the button is clicked
const depannageBtn = document.getElementById('Depannage')
depannageBtn.addEventListener('click', () => {
  ipcRenderer.send('Depannage')
  console.log("Depannage")
})
