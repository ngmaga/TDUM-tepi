// src/pages/EnderecoForm.jsx
import React, { useState } from "react";
import { supabase } from "../supabase/client";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import "../styles/Endereco.css";

export default function EnderecoForm() {
  const { usuario } = useUser();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    cep: "",
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: ""
  });
  const [mensagem, setMensagem] = useState("");

  const buscarCep = async () => {
    if (!form.cep) return;

    try {
      const response = await fetch(`https://viacep.com.br/ws/${form.cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        setMensagem("CEP não encontrado.");
        return;
      }

      setForm((prev) => ({
        ...prev,
        rua: data.logradouro,
        bairro: data.bairro,
        cidade: data.localidade,
        estado: data.uf,
      }));
      setMensagem("");
    } catch (error) {
      setMensagem("Erro ao buscar CEP.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "numero" && isNaN(value)) return;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("enderecos").insert([
      {
        ...form,
        numero: Number(form.numero),
        usuario_id: usuario?.id,
      },
    ]);

    if (error) {
      setMensagem("Erro ao salvar endereço: " + error.message);
    } else {
      setMensagem("Endereço salvo com sucesso!");
      setTimeout(() => navigate("/cliente"), 1500); // redireciona em 1.5s
    }
  };

  return (
    <div className="form-endereco">
      <h2>Adicionar Endereço</h2>
      <form onSubmit={handleSubmit}>
        <input name="cep" placeholder="CEP" value={form.cep} onChange={handleChange} onBlur={buscarCep} required />
        <input name="rua" placeholder="Rua" value={form.rua} onChange={handleChange} required />
        <input name="numero" placeholder="Número" value={form.numero} onChange={handleChange} required />
        <input name="complemento" placeholder="Complemento" value={form.complemento} onChange={handleChange} />
        <input name="bairro" placeholder="Bairro" value={form.bairro} onChange={handleChange} required />
        <input name="cidade" placeholder="Cidade" value={form.cidade} onChange={handleChange} required />
        <input name="estado" placeholder="Estado" value={form.estado} onChange={handleChange} required />
        <button type="submit">Salvar Endereço</button>
      </form>
      {mensagem && <p className="mensagem">{mensagem}</p>}
    </div>
  );
}
