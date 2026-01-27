import { createContext, useState, useCallback } from "react";
import axios from "axios";

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [dishes, setDishes] = useState([]);
  const [specialites, setSpecialites] = useState([]);

  // useCallback pour stabiliser les références
  const fetchDishes = useCallback(async (categorie = 'all') => {
    try {
      const params = { type: 'menu' };
      if (categorie !== 'all') params.categorie = categorie;
      
      const res = await axios.get("http://localhost:8000/api/dishes", { params });
      setDishes(res.data);
    } catch (err) {
      console.error("Erreur chargement plats", err);
    }
  }, []);

  const fetchSpecialites = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/dishes", { 
        params: { type: 'specialites' } 
      });
      setSpecialites(res.data);
    } catch (err) {
      console.error("Erreur chargement spécialités", err);
    }
  }, []);

//   const addDish = async (data) => {
//     const formData = new FormData();
    
//     Object.keys(data).forEach(key => {
//       if (data[key] !== null && data[key] !== undefined) {
//         formData.append(key, data[key]);
//       }
//     });

//     const res = await axios.post("http://localhost:8000/api/dishes", formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//     });

//     if (res.data.is_specialite) {
//         fetchSpecialites();
//     } else {
//         fetchDishes();
//     }

//     return res.data;
//   };

    // const addDish = async (data) => {
    // const formData = new FormData();
    
    // // Convertir explicitement les types
    // formData.append('nom', data.nom);
    // formData.append('is_specialite', data.is_specialite ? '1' : '0'); // '1' ou '0' au lieu de true/false
    
    // if (data.prix) formData.append('prix', data.prix);
    // if (data.categorie) formData.append('categorie', data.categorie);
    // if (data.type) formData.append('type', data.type);
    // if (data.description) formData.append('description', data.description);
    // if (data.photo) formData.append('photo', data.photo);

    // const res = await axios.post("http://localhost:8000/api/dishes", formData, {
    //     headers: { 'Content-Type': 'multipart/form-data' }
    // });

    // // Rafraîchir les listes
    // if (res.data.is_specialite) {
    //     fetchSpecialites();
    // } else {
    //     fetchDishes();
    // }

    // return res.data;
    // };
    const addDish = async (formData) => {
    // formData est déjà un FormData, on l'envoie directement
    const res = await axios.post("http://localhost:8000/api/dishes", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });

    // Rafraîchir les listes
    const isSpecialite = formData.get('is_specialite') === '1';
    if (isSpecialite) {
        fetchSpecialites();
    } else {
        fetchDishes();
    }

    return res.data;
    };
  const deleteDish = async (id, isSpecialite) => {
    await axios.delete(`http://localhost:8000/api/dishes/${id}`);
    
    if (isSpecialite) {
      fetchSpecialites();
    } else {
      fetchDishes();
    }
  };

  return (
    <MenuContext.Provider value={{ 
      dishes, 
      specialites, 
      fetchDishes, 
      fetchSpecialites,
      addDish, 
      deleteDish 
    }}>
      {children}
    </MenuContext.Provider>
  );
};

// Export du contexte pour le hook séparé
export { MenuContext };