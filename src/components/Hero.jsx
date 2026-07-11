import { Monogram } from './Logo.jsx'
import { img } from '../data/images.js'

// Formes « splash » décoratives, reprises du langage graphique du menu imprimé.
function Splash({ className }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="currentColor" aria-hidden="true">
      <path d="M100 15c30-10 65 5 78 32 12 26 2 55-14 75-17 21-42 34-68 30-27-4-52-24-58-51-6-26 8-53 28-68 11-8 22-14 34-18z" />
    </svg>
  )
}

export default function Hero() {
  return (
    <section className="hero" id="accueil">
      <img
        className="hero__photo"
        src={img.heroLounge}
        alt="Salon MORNACO verdoyant, ambiance coffee lounge"
        aria-hidden="true"
      />
      <div className="hero__tint" aria-hidden="true" />
      <Splash className="hero__blob hero__blob--1" />
      <Splash className="hero__blob hero__blob--2" />
      <Splash className="hero__blob hero__blob--3" />
      <div className="hero__drops" aria-hidden="true">
        <span /><span /><span /><span /><span />
      </div>

      <div className="hero__inner">
        <Monogram size={92} />
        <h1 className="hero__title wordmark">MORNACO</h1>
        <p className="hero__sub">Coffee Lounge · Restaurant · Salon de thé</p>
        <p className="hero__tagline">
          Du café turc au bkhour aux pizzas et mojitos à partager, MORNACO réunit
          les saveurs tunisiennes et les envies d&rsquo;aujourd&rsquo;hui autour
          d&rsquo;une table en marbre, à Mornag.
        </p>
        <div className="hero__cta">
          <a className="btn btn--cream" href="#menu">Découvrir la carte</a>
          <a className="btn btn--ghost" href="#contact">Nous trouver</a>
        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span className="hero__scroll-line" />
        Défiler
      </div>

      <svg className="hero__wave" viewBox="0 0 1440 110" preserveAspectRatio="none" aria-hidden="true">
        <path
          d="M0 60 C180 110 340 0 560 40 C780 80 900 10 1120 35 C1280 55 1380 45 1440 60 L1440 110 L0 110 Z"
          fill="var(--cream-soft)"
        />
      </svg>
    </section>
  )
}
