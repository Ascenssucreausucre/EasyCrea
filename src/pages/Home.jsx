import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Deckouverte from "/src/assets/img/Deckouverte.jpg";

export function Home() {
  // État pour savoir si le bouton d'installation doit être affiché
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const navigate = useNavigate();

  // Écoute de l'événement 'beforeinstallprompt'
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault(); // Empêche le prompt automatique
      setDeferredPrompt(e); // Garde l'événement pour plus tard
      setShowInstallButton(true); // Affiche le bouton d'installation
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Nettoyage de l'écouteur quand le composant est démonté
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  function getStarted() {
    navigate("/sign-up");
  }

  // Fonction pour afficher le prompt d'installation
  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Montre le prompt d'installation
      deferredPrompt.userChoice.then((choiceResult) => {
        setDeferredPrompt(null); // Réinitialise le prompt
        setShowInstallButton(false); // Cache le bouton après l'action
      });
    }
  };

  return (
    <>
      <h1 className="home-title">Easycrea</h1>
      <div className="home-page">
        <h2 className="title">
          Bienvenue sur la plateforme de création de deck communautaire de
          Deckouverte !
        </h2>
        <p>
          Ici, vous pourrez contribuer aux différents decks qui seront jouables
          plus tard en créant des cartes, et ainsi participer à l'expérience de
          nombreux joueurs !
        </p>
        <div
          className="button-container"
          style={{ justifyContent: "space-around" }}
        >
          <button
            className="button variant"
            style={{ margin: "5px 20%" }}
            onClick={getStarted}
          >
            Découvrir !
          </button>
          {showInstallButton && (
            <button
              onClick={handleInstallClick}
              className="install-button button"
            >
              Installer l'application
            </button>
          )}
        </div>
        <div className="img-text">
          <img src={Deckouverte} alt="Deckouverte" />
          <div>
            <p>
              Créez des jeux totalement loufoques ! Deckouverte est une
              application dans laquelle vous jouez des decks qui racontent tous
              une histoire différente !
            </p>
            <a
              href="https://expo.dev/accounts/mxou/projects/Deckouverte/builds/af056883-7a07-4621-bb4d-7e7cbd2e8489"
              className="button"
            >
              Télécharger l'application !
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
