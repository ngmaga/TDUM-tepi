// src/pages/DashboardEmpreendedor.jsx
import React, { useState, useEffect } from "react";
import { supabase } from "../supabase/client";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import "../styles/DashboardEmpreendedor.css";

export default function DashboardEmpreendedor() {
  const { usuario } = useUser();

  const [nomeServico, setNomeServico] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [emailContato, setEmailContato] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [imagens, setImagens] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  // Preenche o email automaticamente com o email do usuário logado
  useEffect(() => {
    if (usuario?.email) {
      setEmailContato(usuario.email); // Preenche automaticamente
    }
  }, [usuario]);

  const handleImagemChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 3); // Máximo 3 imagens
    setImagens(files);
  };

  const uploadImagens = async () => {
    const urls = [];

    for (const imagem of imagens) {
      const fileName = `${Date.now()}-${imagem.name}`;
      const { data, error } = await supabase.storage
        .from("servicos")
        .upload(fileName, imagem);

      if (error) {
        setMensagem("Erro ao enviar imagens.");
        return [];
      }

      const { data: publicUrl } = supabase.storage
        .from("servicos")
        .getPublicUrl(fileName);

      urls.push(publicUrl.publicUrl);
    }

    return urls;
  };

  const handleCadastroServico = async () => {
    if (!nomeServico || !descricao || !valor || !emailContato || !whatsapp) {
      setMensagem("Preencha todos os campos.");
      return;
    }

    const fotos = await uploadImagens();

    const { error } = await supabase.from("servicos").insert([
      {
        usuario_id: usuario.usuario_id, // Aqui é referenciado o ID do usuário
        nome_servico: nomeServico,
        descricao,
        valor: parseFloat(valor),
        email_contato: emailContato,
        whatsapp,
        fotos,
      },
    ]);

    if (error) {
      setMensagem("Erro ao cadastrar serviço.");
    } else {
      setMensagem("Serviço cadastrado com sucesso!");
      setNomeServico("");
      setDescricao("");
      setValor("");
      setWhatsapp("");
      setImagens([]);

      // Redirecionar para a página de exibição dos serviços após o cadastro
      setTimeout(() => {
        navigate("/meus-servicos");
      }, 1500);
    }
  };

  return (
    <div className="dashboard-empreendedor">
      <h2>Cadastro de Serviço</h2>

      <input
        placeholder="Nome do serviço"
        value={nomeServico}
        onChange={(e) => setNomeServico(e.target.value)}
      />

      <textarea
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />

      <input
        placeholder="Valor"
        type="number"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
      />

      <input
        placeholder="Email para contato"
        type="email"
        value={emailContato}
        onChange={(e) => setEmailContato(e.target.value)}
      />

      <input
        placeholder="WhatsApp"
        value={whatsapp}
        onChange={(e) => setWhatsapp(e.target.value)}
      />

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImagemChange}
      />

      <button onClick={handleCadastroServico}>Cadastrar Serviço</button>

      {mensagem && (
        <p className={`mensagem-status ${mensagem.includes("sucesso") ? "success" : "error"}`}>
          {mensagem}
        </p>
      )}
    </div>
  );
}
