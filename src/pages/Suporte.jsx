import React, { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../supabase/client";
import "../styles/Suporte.css";
import emailjs from '@emailjs/browser';

export default function Suporte() {
  const [chatAberto, setChatAberto] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [status, setStatus] = useState("");

  const enviarMensagem = async () => {
    if (!nome || !email || !mensagem) {
      setStatus("Preencha todos os campos.");
      return;
    }
  
    try {
      // Envia para o Supabase
      const { error } = await supabase.from("suporte").insert([
        { nome, email, mensagem }
      ]);
  
      if (error) throw error;
  
      // Envia o email com EmailJS
      await emailjs.send(
        "service_yunn5ml",     // Service-id
        "template_idy9k2v",    // template-id
        {
          nome,
          email,
          mensagem
        },
        "1_RqDEaWm_STkANsn"     //publickey
      );
  
      setStatus("Mensagem enviada com sucesso!");
      setNome("");
      setEmail("");
      setMensagem("");
  
    } catch (err) {
      console.error(err);
      setStatus("Erro ao enviar: " + err.message);
    }
  };
  

  return (
    <motion.div className="suporte-pagina" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      <motion.div className="suporte-hero" initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
      <a href="/" className="botao-voltar">← Início</a>
        <h1>Central de Suporte</h1>
        <p>Está com dúvidas? Estamos aqui para te ajudar!</p>
      </motion.div>

      <div className="suporte-secoes">
        <motion.section className="faq" initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
          <h2>Perguntas Frequentes</h2>
          <ul>
            <li><strong>Como redefinir minha senha?</strong><br />Acesse sua conta e vá em "Segurança".</li>
            <li><strong>Como entrar em contato com o suporte?</strong><br />Use os canais abaixo ou o botão de ajuda.</li>
            <li><strong>Onde posso ver minhas solicitações?</strong><br />Na área do cliente, em "Minhas solicitações".</li>
          </ul>
        </motion.section>

        <motion.section className="formulario" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
          <h2>Fale Conosco</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            enviarMensagem();
          }}>
            <input
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <textarea
              placeholder="Descreva sua dúvida..."
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
            />
            <button type="submit">Enviar</button>
            {status && <p className="mensagem-status">{status}</p>}
          </form>
        </motion.section>
      </div>

      <motion.div className="canais-contato" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }}>
        <h3>Canais de Atendimento</h3>
        <p><strong>Email:</strong> suporte@tudoemum.com.br</p>
        <p><strong>WhatsApp:</strong> (11) 99999-9999</p>
        <p><strong>Telefone:</strong> 0800 123 4567</p>
      </motion.div>

      <button className="botao-ajuda" onClick={() => setChatAberto(!chatAberto)}>
        {chatAberto ? "Fechar Chat" : "Ajuda"}
      </button>

      {chatAberto && (
        <motion.div className="chat-popup" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h4>Atendente Virtual</h4>
          <p>Olá! Como posso te ajudar?</p>
          <input type="text" placeholder="Digite sua mensagem..." />
        </motion.div>
      )}
    </motion.div>
  );
}
