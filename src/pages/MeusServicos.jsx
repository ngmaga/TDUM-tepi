import React, { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import "../styles/MeusServicos.css";

export default function MeusServicos() {
  const { usuario } = useUser();
  const [meusServicos, setMeusServicos] = useState([]);
  const [erro, setErro] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const buscarServicos = async () => {
      if (!usuario || !usuario.usuario_id) {
        setErro("Usuário não encontrado ou não tem usuario_id");
        return;
      }

      const { data, error } = await supabase
        .from("servicos")
        .select("*")
        .eq("usuario_id", usuario.usuario_id); // filtro pelo dono do serviço

      if (error) {
        setErro(`Erro ao buscar seus serviços: ${error.message}`);
        return;
      }

      setMeusServicos(data);
    };

    buscarServicos();
  }, [usuario]);

  const handleExcluir = async (id) => {
    const { error } = await supabase.from("servicos").delete().eq("id", id);
    if (error) {
      alert("Erro ao excluir serviço");
    } else {
      setMeusServicos(meusServicos.filter((servico) => servico.id !== id));
    }
  };

  return (
    <div className="meus-servicos-container">
      <h2>Meus Serviços Cadastrados</h2>
      {erro && <p className="erro">{erro}</p>}
      {meusServicos.length === 0 ? (
        <p>Você ainda não cadastrou nenhum serviço.</p>
      ) : (
        <div className="meus-servicos-grid">
          {meusServicos.map((servico) => (
            <div key={servico.id} className="meu-servico-card">
              {servico.fotos?.[0] && <img src={servico.fotos[0]} alt="Foto" />}
              <h3>{servico.nome_servico}</h3>
              <p>{servico.descricao}</p>
              <p><strong>Valor:</strong> R$ {servico.valor}</p>
              <p><strong>Contato:</strong> {servico.email_contato} | {servico.whatsapp}</p>
              <div className="acoes">
                <button onClick={() => handleExcluir(servico.id)} className="btn-excluir">
                  Excluir
                </button>
                {/* Redirecionar para página de edição se necessário */}
                {/* <button onClick={() => navigate(`/editar-servico/${servico.id}`)}>Editar</button> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
