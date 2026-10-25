import "./base.css";
import arlotImg from "../heroes/Arlot.jpg";
import arlotTradeImg from "../trades/Arlottrade.png";

import baxiaImg from "../heroes/Baxia.jpg";
import baxiaTradeImg from "../trades/baxiatrade.jpg";

import lapulapuImg from "../heroes/Lapu.jpg";
import lapulapuTradeImg from "../trades/lapulaputrade.jpg";

import leomordImg from "../heroes/Lomasroto.jpg";
import leomordTradeImg from "../trades/leomordtrade.jpg";

import phoveusImg from "../heroes/Phoveus.jpg";
import phoveusTradeImg from "../trades/phoveustrade.jpg";

import zhixinImg from "../heroes/Chuchin.jpg";
import zhixinTradeImg from "../trades/zhuxintrade.jpg";

function Base() {
  return (
    <div className="base-container">
      <div className="base-grid">
        <div className="hero-card">
          <img src={arlotImg} alt="Arlot" className="hero-mini" />
          <img src={arlotTradeImg} alt="Trades" className="hero-trades" />
        </div>

        <div className="hero-card">
          <img src={baxiaImg} alt="Baxia" className="hero-mini" />
          <img src={baxiaTradeImg} alt="Trades" className="hero-trades" />
        </div>

        <div className="hero-card">
          <img src={lapulapuImg} alt="Lapu Lapu" className="hero-mini" />
          <img src={lapulapuTradeImg} alt="Trades" className="hero-trades" />
        </div>

        <div className="hero-card">
          <img src={leomordImg} alt="Leomord" className="hero-mini" />
          <img src={leomordTradeImg} alt="Trades" className="hero-trades" />
        </div>

        <div className="hero-card">
          <img src={phoveusImg} alt="Phoveus" className="hero-mini" />
          <img src={phoveusTradeImg} alt="Trades" className="hero-trades" />
        </div>

        <div className="hero-card">
          <img src={zhixinImg} alt="Zhixin" className="hero-mini" />
          <img src={zhixinTradeImg} alt="Trades" className="hero-trades" />
        </div>
      </div>
    </div>
  );
}

export default Base;
