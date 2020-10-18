import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

import '../styles/pages/landing.css';

import logoImg from '../images/logo.svg';

export const Landing = () => {
  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <img src={logoImg} alt="logo"/>

        <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite o orfanatos e mude o dia de muitas crianças.</p>

          <div className="location">
            <strong>Araçatuba</strong>
            <span>São Paulo</span>
          </div>

          <Link className="enter-app" to="app">
            <FiArrowRight 
              size={26}
              color="rgba(0, 0, 0, 0.6)"
            />
          </Link>
        </main>
      </div>
    </div>
  );
}

