import Deckouverte from "/src/assets/img/Deckouverte.jpg";

export function Home() {
  return (
    <>
      <h1 className="home-title">Easycrea</h1>
      <div className="home-page">
        <h2>
          Bienvenue sur la plateforme de création de deck communautaire de
          Deckouverte.
        </h2>
        <div className="img-text">
          <img src={Deckouverte} alt="" />
          <div>
            <p>
              Créez des jeux totalement loufoques !!!! Deckouverte est une
              application dans laquelle vous jouez des decks qui racontent tous
              une histoire différente !
            </p>
            <a href="" className="button">
              Télécharger l'application !
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
