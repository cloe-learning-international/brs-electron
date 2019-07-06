console.log("menu.js from renderer-process")

const {ipcRenderer} = require('electron')

// Tell main process to start the soft when the button is clicked
const accueilBtn = document.getElementById('Accueil')
accueilBtn.addEventListener('click', () => {
  ipcRenderer.send('Accueil')
  console.log("Accueil")
  // Afficher la bonne page
  document.getElementById("home").hidden = false;
  // Cacher les autres pages
  document.getElementById("about").hidden = true;
  document.getElementById("sauvegarde").hidden = true;
  document.getElementById("comptabilite").hidden = true;
})

// Tell main process to start the soft when the button is clicked
const sauvegardeBtn = document.getElementById('Sauvegarde')
sauvegardeBtn.addEventListener('click', () => {
  ipcRenderer.send('Sauvegarde')
  console.log("Sauvegarde")
  // Afficher la bonne page
  document.getElementById("sauvegarde").hidden = false;
  // Cacher les autres pages
  document.getElementById("home").hidden = true;
  document.getElementById("about").hidden = true;
  document.getElementById("comptabilite").hidden = true;
})

// Tell main process to start the soft when the button is clicked
const comptabiliteBtn = document.getElementById('Comptabilite')
comptabiliteBtn.addEventListener('click', () => {
  ipcRenderer.send('Comptabilite')
  console.log("Comptabilite")
  // Afficher la bonne page
  document.getElementById("comptabilite").hidden = false;
  // Cacher les autres pages
  document.getElementById("home").hidden = true;
  document.getElementById("about").hidden = true;
  document.getElementById("sauvegarde").hidden = true;
})

// Tell main process to start the soft when the button is clicked
const proposBtn = document.getElementById('Propos')
proposBtn.addEventListener('click', () => {
  ipcRenderer.send('Propos')
  console.log("Propos")
  // Afficher la bonne page
  document.getElementById("about").hidden = false;
  // Cacher les autres pages
  document.getElementById("home").hidden = true;
  document.getElementById("sauvegarde").hidden = true;
  document.getElementById("comptabilite").hidden = true;
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
