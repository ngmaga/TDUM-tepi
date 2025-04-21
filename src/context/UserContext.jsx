// src/context/UserContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/client";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarUsuario = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        const userId = session.user.id;

        // Verifica na tabela "usuarios"
        const { data: cliente, error: erroCliente } = await supabase
          .from("usuarios")
          .select("*")
          .eq("id", userId)
          .single();

        if (cliente && !erroCliente) {
          setUsuario({ ...cliente, tipo: "cliente", usuario_id: cliente.id });
          setCarregando(false);
          return;
        }

        // Verifica na tabela "empreendedores"
        const { data: empreendedor, error: erroEmpreendedor } = await supabase
          .from("empreendedores")
          .select("*")
          .eq("id", userId)
          .single();

        if (empreendedor && !erroEmpreendedor) {
          setUsuario({ ...empreendedor, tipo: "empreendedor", usuario_id: empreendedor.id });
          setCarregando(false);
          return;
        }

        // Caso não esteja em nenhuma tabela, mas esteja autenticado
        setUsuario(session.user); 
      }

      setCarregando(false);
    };

    carregarUsuario();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        carregarUsuario();
      } else {
        setUsuario(null);
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ usuario, setUsuario, carregando }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
