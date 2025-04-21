import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../supabase/client";
import { comparePassword } from "../utils/passwordUtils";
import { useUser } from "../context/UserContext";
import "../styles/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const { setUsuario } = useUser();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const emailTrim = email.trim();
    const senhaTrim = senha.trim();

    if (!emailTrim || !senhaTrim) {
      setMensagem("Preencha todos os campos.");
      return;
    }

    // Verifica se o usuário existe na tabela 'usuarios'
    const { data: usuario, error } = await supabase
      .from("usuarios")
      .select("*")
      .eq("email", emailTrim)
      .single();

    if (error || !usuario) {
      setMensagem("Usuário não encontrado.");
      return;
    }

    // Verifica a senha
    const senhaCorreta = await comparePassword(senhaTrim, usuario.senha);
    if (senhaCorreta) {
      // Atualiza o contexto com os dados do usuário
      setUsuario(usuario);

      // Verifica o tipo de usuário e redireciona
      if (usuario.tipo === "cliente") {
        navigate("/cliente");
      } else if (usuario.tipo === "empreendedor") {
        navigate("/empreendedor");
      }
    } else {
      setMensagem("Senha incorreta.");
    }
  };

  return (
    <motion.div className="login-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <motion.h2 initial={{ y: -20 }} animate={{ y: 0 }} transition={{ delay: 0.3 }}>
        Login
      </motion.h2>
      <motion.input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      />
      <motion.input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      />
      <motion.button
        onClick={handleLogin}
        className="botao-login"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        Entrar
      </motion.button>
      <motion.p
        className="login-cadastro-link"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Não tem uma conta? <span onClick={() => navigate("/cadastro")}>Cadastre-se aqui</span>
      </motion.p>
      {mensagem && <p className="mensagem-status">{mensagem}</p>}
    </motion.div>
  );
}
