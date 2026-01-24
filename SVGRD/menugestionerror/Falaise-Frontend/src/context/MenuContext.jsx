import { createContext, useContext, useState } from "react";

const MenuContext = createContext(); // ← PAS besoin d'exporter cette ligne

export const MenuProvider = ({ children }) => {
  const [produits, setProduits] = useState([
    { id: 1, nom: "Espresso", prix: "12", categorie: "cafes", type: "Boisson", description: "" },
    { id: 2, nom: "Cappuccino", prix: "18", categorie: "cafes", type: "Boisson", description: "" },
    { id: 3, nom: "Jus d’orange", prix: "25", categorie: "jus", type: "Boisson", description: "Pressé" },
    { id: 4, nom: "Spaghetti carbonara", prix: "65", categorie: "pates", type: "Plat", description: "Crème, parmesan, lardons" },
    { id: 5, nom: "Margherita", prix: "60", categorie: "pizzas", type: "Pizza", description: "" },
  ]);

  const addProduit = (nouveau) => {
    setProduits((prev) => [...prev, { ...nouveau, id: Date.now() }]);
  };

  return (
    <MenuContext.Provider value={{ produits, addProduit }}>
      {children}
    </MenuContext.Provider>
  );
};

// AJOUTE LE HOOK ICI
export const useMenu = () => useContext(MenuContext);