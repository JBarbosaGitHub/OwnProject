import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '../firebase'; // Importa 'db'
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc, setDoc } from 'firebase/firestore'; // Importa funções do Firestore

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userFavorites, setUserFavorites] = useState([]); // Novo estado para favoritos
  const [userName, setUserName] = useState(null); // Novo estado para o nome do utilizador
  const [isAdmin, setIsAdmin] = useState(false); // Novo estado para permissão de admin

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        // Se o utilizador está logado, tenta buscar os favoritos
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setUserFavorites(userData.favorites || []);
            setUserName(userData.name || null); // Define o nome do utilizador
            setIsAdmin(userData.isAdmin || false); // Define o status de admin
          } else {
            // Cria o documento do utilizador se não existir (para favoritos)
            await setDoc(userDocRef, { favorites: [] }, { merge: true });
            setUserFavorites([]);
            setUserName(null);
            setIsAdmin(false);
          }
        } catch (error) {
          console.error('Erro ao buscar/criar dados do utilizador:', error);
          setUserFavorites([]);
          setUserName(null);
          setIsAdmin(false);
        }
      } else {
        setUserFavorites([]); // Limpa favoritos se não houver utilizador logado
        setUserName(null); // Limpa o nome ao fazer logout
        setIsAdmin(false); // Limpa o status de admin ao fazer logout
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const logout = () => {
    setUserFavorites([]); // Limpa favoritos ao fazer logout
    setUserName(null); // Limpa o nome ao fazer logout
    setIsAdmin(false); // Limpa o status de admin ao fazer logout
    return signOut(auth);
  };

  // Função para adicionar/remover favorito
  const toggleFavorite = async (simulatorId) => {
    if (!currentUser) {
      alert('Precisa estar logado para adicionar favoritos!');
      return;
    }
    const userDocRef = doc(db, 'users', currentUser.uid);
    const isFavorite = userFavorites.includes(simulatorId);

    try {
      if (isFavorite) {
        await updateDoc(userDocRef, {
          favorites: arrayRemove(simulatorId)
        });
        setUserFavorites(userFavorites.filter(id => id !== simulatorId));
      } else {
        await updateDoc(userDocRef, {
          favorites: arrayUnion(simulatorId)
        });
        setUserFavorites([...userFavorites, simulatorId]);
      }
    } catch (error) {
      console.error('Erro ao atualizar favoritos:', error);
    }
  };

  const value = {
    currentUser,
    loading,
    logout,
    userFavorites,
    toggleFavorite,
    userName, // Expor o nome do utilizador
    isAdmin, // Expor o status de admin
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
