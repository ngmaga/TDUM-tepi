import React, { useState } from "react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";
import { hashPassword } from "../utils/passwordUtils";
import { isValidEmail, isStrongPassword } from "../utils/validators";
import "../styles/Cadastro.css";


export default function Cadastro() {
  const [tipo, setTipo] = useState("cliente");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descricao, setDescricao] = useState("");
  const [mensagem, setMensagem] = useState("");

  const navigate = useNavigate();

  const handleCadastro = async () => {
    if (!nome || !email || !senha || (tipo === "empreendedor" && (!categoria || !descricao))) {
      setMensagem("Preencha todos os campos.");
      return;
    }
    if (!isValidEmail(email)) {
      setMensagem("Email inválido.");
      return;
    }
    if (!isStrongPassword(senha)) {
      setMensagem("A senha precisa de no mínimo 6 caracteres.");
      return;
    }

    const senhaHash = await hashPassword(senha);

    const { data: usuario, error } = await supabase
      .from("usuarios")
      .insert([{ nome, email, senha: senhaHash, tipo }])
      .select()
      .single();

    if (error) {
      setMensagem("Erro ao cadastrar: " + error.message);
      return;
    }

    if (tipo === "empreendedor") {
      const { error: empError } = await supabase
        .from("empreendedores")
        .insert([{ id: usuario.id, categoria, descricao }]);
      
      if (empError) {
        setMensagem("Erro ao cadastrar empreendedor: " + empError.message);
        return;
      }
    }

    setMensagem("Cadastro realizado com sucesso!");
    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastro</h2>

      <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
        <option value="cliente">Cliente</option>
        <option value="empreendedor">Empreendedor</option>
      </select>

      <input placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />

      {tipo === "empreendedor" && (
        <>
          <input placeholder="Categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)} />
          <textarea placeholder="Descrição do serviço" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
        </>
      )}

      <button onClick={handleCadastro}>Cadastrar</button>
      {mensagem && <p className="mensagem">{mensagem}</p>}
    </div>
  );
}
