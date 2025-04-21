import React from "react";
import { Link } from "react-router-dom";
import "../styles/LandingPage.css";

export default function LandingPage() {
  return (
    <div className="landing-page">
      <header className="header">
        <div className="logo">
          <img src="/img/logo.png" alt="logo" />
        </div>
        <nav>
          <ul>
            <li><Link to="/">HOME</Link></li>
            <li><Link to="/cadastro">CADASTRO</Link></li>
            <li><Link to="/login">ENTRAR</Link></li>
            <li><Link to="/suporte">SUPORTE</Link></li>
          </ul>
        </nav>
      </header>

      <main className="main-container">
        <section className="content">
          <div className="text-box">
            <h1>SEU <br /> SERVIÇO <br /> AQUI</h1>
            <p>Impulsione seu negócio, junte-se ao <br /> nosso site e conecte-se com novos <br /> clientes que valorizam o seu talento!</p>
            <Link className="cta-button" to="/login">ENCONTRAR SERVIÇO</Link>
          </div>

          <div className="image-box">
            <img src="/img/baixados (1).jpg" alt="Mãos unidas" />
          </div>
        </section>

        <section className="icons">
          <h1>Benefícios para você</h1>
          <div className="benefits">
            <div className="benefit">
              <img src="/img/celular.png" alt="mensagem" />
              <h3>Pedidos de serviço chegam a toda hora no seu celular.</h3>
            </div>
            <div className="benefit">
              <img src="/img/maos.png" alt="clientes" />
              <h3>Conecte-se com pessoas que buscam produtos ou serviços como os seus.</h3>
            </div>
            <div className="benefit">
              <img src="/img/homem.png" alt="gerenciamento" />
              <h3>Ferramentas para gerenciar seus produtos e serviços com facilidade.</h3>
            </div>
          </div>
        </section>

        <section className="plano">
          <img src="/img/mulher.png" alt="Plano Premium" />
          <div className="text">
            <h2>Plano Premium: Potencialize Suas Vendas e Conquiste o Sucesso</h2>
            <h3>Quer levar o seu negócio para o próximo nível?</h3>
            <h4>Assine o nosso <strong>Plano Premium</strong> e aproveite recursos exclusivos para vender mais, <br /> melhorar sua visibilidade e conquistar mais clientes.</h4>
            <Link className="btn" to="/planos">Confira os Planos</Link>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-logo">
            <img src="img/logo.png" alt="Logo" />
          </div>
          <div className="footer-links">
            <ul>
              <li><a href="#">Sobre nós</a></li>
              <li><a href="#">Termos de Serviço</a></li>
              <li><a href="#">Política de Privacidade</a></li>
              <li><a href="#">Suporte</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Tudo em um - Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
