import React, { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import "../styles/ServicosCliente.css";

export default function ServicosCliente() {
  const [servicos, setServicos] = useState([]);
  const [cep, setCep] = useState("");
  const [erro, setErro] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const navigate = useNavigate();
  const { usuario } = useUser();
  const [endereco, setEndereco] = useState(null);

  useEffect(() => {
    const buscarServicos = async () => {
      const { data, error } = await supabase.from("servicos").select("*");
      if (error) {
        console.error(error);
        setErro(error.message);
      } else {
        setServicos(data);
      }
    };

    buscarServicos();
  }, []);

  useEffect(() => {
    const buscarEndereco = async () => {
      if (!usuario) return;

      const { data, error } = await supabase
        .from("enderecos")
        .select("*")
        .eq("usuario_id", usuario.id)
        .single();

      if (data && !error) {
        setCep(data.cep);
        setEndereco(data);
      }
    };

    buscarEndereco();
  }, [usuario]);

  const handleOpenEnderecoForm = () => {
    navigate("/endereco");
  };

    const handleVoltarInicio = () => {
    navigate("/");
  };

  return (
    <div className="lista-servicos">
      <div className="cabecalho-servicos">
        <div className="esquerda">
        <button className="btn-voltar" onClick={handleVoltarInicio}>← Início</button>
          <h2 className="titulo-destaque">Serviços disponíveis</h2>
          {cep && (
            <div className="cep-usuario">
              CEP: <strong>{cep}</strong>
            </div>
          )}
        </div>
        <div className="direita">
        <button className="btn-adicionar-endereco" onClick={handleOpenEnderecoForm}>
        {endereco ? "Editar Endereço" : "Adicionar Endereço"}
      </button>
        </div>
      </div>

      {erro && <p className="erro">{erro}</p>}

      <div className="cards-container">
        {servicos.length > 0 ? (
          servicos.map((servico, idx) => (
            <motion.div
              className="card-servico"
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              {servico.fotos?.length > 0 && (
                <img src={servico.fotos[0]} alt="Foto do serviço" />
              )}
              <h3>{servico.nome_servico}</h3>
              <p>{servico.descricao}</p>
              <p>
                <strong>Preço:</strong> R$ {servico.valor}
              </p>
              <p>
                <strong>Contato:</strong> {servico.email_contato} |{" "}
                {servico.whatsapp}
              </p>
              <button className="btn-contratar">Contratar</button>
            </motion.div>
          ))
        ) : (
          <p>Nenhum serviço encontrado.</p>
        )}
      </div>
    </div>
  );
}
