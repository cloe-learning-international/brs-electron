module.exports = class About extends (require("../Component")) {
    render() {
        return `
        <h1>À venir :</h1>
        <div class="row">
          <div class="col-4">
            <div class="list-group" id="list-tab" role="tablist">
              <a class="list-group-item list-group-item-action active" id="list-home-list" data-toggle="list" href="#list-home" role="tab" aria-controls="home">Page "Accueil"</a>
              <a class="list-group-item list-group-item-action" id="list-profile-list" data-toggle="list" href="#list-profile" role="tab" aria-controls="profile">Page "Installation"</a>
              <a class="list-group-item list-group-item-action" id="list-messages-list" data-toggle="list" href="#list-messages" role="tab" aria-controls="messages">Page "Aide"</a>
              <a class="list-group-item list-group-item-action" id="list-settings-list" data-toggle="list" href="#list-settings" role="tab" aria-controls="settings">Page "Comptabilité"</a>
            </div>
          </div>
          <div class="col-8">
            <div class="tab-content" id="nav-tabContent">
              <div class="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">Lien vers le site BRSEU</li>
                  <li class="list-group-item">Lien vers le site BRSFR</li>
                  <li class="list-group-item">Lien vers les formations des appareils</li>
                  <li class="list-group-item">Lien vers la formation TQ2022</li>
                  <li class="list-group-item">Lien vers le sit</li>
                </ul>
              </div>
              <div class="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">Cras justo odio</li>
                  <li class="list-group-item">Dapibus ac facilisis in</li>
                  <li class="list-group-item">Morbi leo risus</li>
                  <li class="list-group-item">Porta ac consectetur ac</li>
                  <li class="list-group-item">Vestibulum at eros</li>
                </ul>
              </div>
              <div class="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">Cras justo odio</li>
                  <li class="list-group-item">Dapibus ac facilisis in</li>
                  <li class="list-group-item">Morbi leo risus</li>
                  <li class="list-group-item">Porta ac consectetur ac</li>
                  <li class="list-group-item">Vestibulum at eros</li>
                </ul>
              </div>
              <div class="tab-pane fade" id="list-settings" role="tabpanel" aria-labelledby="list-settings-list">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">Protégé la page avec un mot de passe</li>
                  <li class="list-group-item">Calcul de financement de l'appareil</li>
                  <li class="list-group-item">Calcul de rentabilité de l'appareil</li>
                  <li class="list-group-item">Afficher les paiements Stripe</li>
                  <li class="list-group-item">Afficher les paiements TransferWise</li>
                  <li class="list-group-item">Afficher les documents VosFactures</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        `
    }
}
