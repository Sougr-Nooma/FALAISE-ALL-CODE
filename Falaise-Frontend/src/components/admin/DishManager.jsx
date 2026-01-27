import { useState, useEffect, useRef } from "react";
// import { useMenu } from "../../context/MenuContext";
import { useMenu } from "../../hooks/useMenu";
// import axios from "axios";

// const CATEGORIES = [
//   { value: "cafes", label: "Cafés" },
//   { value: "jus", label: "Jus & Boissons" },
//   { value: "pates", label: "Pâtes" },
//   { value: "pizzas", label: "Pizzas" },
//   { value: "poissons", label: "Poissons" },
//   { value: "desserts", label: "Desserts" },
// ];

// export default function DishManager() {
//   const { dishes, specialites, fetchDishes, fetchSpecialites, addDish, deleteDish } = useMenu();
//   const [filtreType, setFiltreType] = useState('tous'); // 'tous' | 'menu' | 'specialites'
//   const [filtreCategorie, setFiltreCategorie] = useState('all');
//   const [showForm, setShowForm] = useState(false);
//   const [formType, setFormType] = useState('menu'); // 'menu' | 'specialite'
  
//   const [form, setForm] = useState({
//     nom: '',
//     prix: '',
//     categorie: 'cafes',
//     type: '',
//     description: '',
//   });
//   const [photo, setPhoto] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const fileInput = useRef(null);

//   // Rafraîchir quand filtre change
//   useEffect(() => {
//     if (filtreType === 'menu' || filtreType === 'tous') {
//       const loadDishes = () => fetchDishes(filtreCategorie);
//       loadDishes();
//     }
//     if (filtreType === 'specialites' || filtreType === 'tous') {
//       fetchSpecialites();
//     }
//   }, [filtreType, filtreCategorie]);

//   const handlePhoto = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setPhoto(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const data = {
//       ...form,
//       is_specialite: formType === 'specialite',
//       prix: formType === 'menu' ? form.prix : null,
//       categorie: formType === 'menu' ? form.categorie : null,
//     };

//     if (photo) data.photo = photo;

//     try {
//       await addDish(data);
//       resetForm();
//       setShowForm(false);
//     } catch (err) {
//       alert("Erreur lors de l'ajout");
//       console.log("Erreur lors de l'ajou", err)
//     }
//   };

//   const resetForm = () => {
//     setForm({ nom: '', prix: '', categorie: 'cafes', type: '', description: '' });
//     setPhoto(null);
//     setPreview(null);
//   };

//   // Données affichées selon filtre
//   const getDisplayedItems = () => {
//     if (filtreType === 'menu') return dishes;
//     if (filtreType === 'specialites') return specialites;
//     return [...dishes, ...specialites].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
//   };


const CATEGORIES = [
{ value: "cafes", label: "Cafés" },
{ value: "jus", label: "Jus & Boissons" },
{ value: "pates", label: "Pâtes" },
{ value: "pizzas", label: "Pizzas" },
{ value: "poissons", label: "Poissons" },
{ value: "desserts", label: "Desserts" },
];

export default function DishManager() {
    const { dishes, specialites, fetchDishes, fetchSpecialites, addDish, deleteDish } = useMenu();
    const [filtreType, setFiltreType] = useState('tous');
    const [filtreCategorie, setFiltreCategorie] = useState('all');
    const [showForm, setShowForm] = useState(false);
    const [formType, setFormType] = useState('menu');
    
    const [menuForm, setMenuForm] = useState({
        nom: '',
        prix: '',
        categorie: 'cafes',
        type: '',
        description: '',
    });
    // Formulaire SPÉCIALITÉ
    const [specialiteForm, setSpecialiteForm] = useState({
        nom: '',
        description: '',
    });
    const [photo, setPhoto] = useState(null);
    const [preview, setPreview] = useState(null);
    const fileInput = useRef(null);

    // CORRECTION: useEffect sans dépendances problématiques
    useEffect(() => {
        const loadData = () => {
        if (filtreType === 'menu' || filtreType === 'tous') {
            fetchDishes(filtreCategorie);
        }
        if (filtreType === 'specialites' || filtreType === 'tous') {
            fetchSpecialites();
        }
        };
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filtreType, filtreCategorie]);

    const handlePhoto = (e) => {
        const file = e.target.files[0];
        if (file) {
        setPhoto(file);
        setPreview(URL.createObjectURL(file));
        }
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
        
    //     const data = {
    //     ...form,
    //     is_specialite: formType === 'specialite',
    //     prix: formType === 'menu' ? form.prix : null,
    //     categorie: formType === 'menu' ? form.categorie : null,
    //     };

    //     if (photo) data.photo = photo;

    //     try {
    //     await addDish(data);
    //     resetForm();
    //     setShowForm(false);
    //     } catch (err) {
    //     alert("Erreur lors de l'ajout");
    //     console.log("Erreur lors de l'ajout",err)
    //     }
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // // VALIDATION FRONT
        // if (formType === 'menu' && (!form.prix || form.prix <= 0)) {
        //     alert("Le prix est requis pour un plat de menu");
        //     return;
        // }
        
        // if (formType === 'specialite' && !photo) {
        //     alert("Une photo est requise pour une spécialité");
        //     return;
        // }

        // const data = new FormData();
        
        // // Champs communs
        // data.append('nom', form.nom);
        // data.append('description', form.description || '');
        // data.append('is_specialite', formType === 'specialite' ? '1' : '0'); // '1' ou '0' pour FormData
        
        // // Champs MENU uniquement
        // if (formType === 'menu') {
        //     data.append('prix', form.prix);
        //     data.append('categorie', form.categorie);
        //     data.append('type', form.type || '');
        // }

        // let nomValue;
        // TOUJOURS créer un FormData
        const formData = new FormData();
        
  
        // if (formType === 'menu') {
        //     // Données formulaire MENU uniquement
        //     data = {
        //     nom: menuForm.nom,
        //     prix: menuForm.prix,
        //     categorie: menuForm.categorie,
        //     type: menuForm.type,
        //     description: menuForm.description,
        //     is_specialite: false,
        //     };
        // } else {
        //     // Données formulaire SPÉCIALITÉ uniquement
        //     data = {
        //     nom: specialiteForm.nom,
        //     description: specialiteForm.description,
        //     is_specialite: true,
        //     };
        // }
        if (formType === 'menu') {
            // Formulaire MENU
            formData.append('nom', menuForm.nom);
            formData.append('prix', menuForm.prix);
            formData.append('categorie', menuForm.categorie);
            formData.append('type', menuForm.type || '');
            formData.append('description', menuForm.description || '');
            formData.append('is_specialite', '0'); // '0' = false
            // nomValue = menuForm.nom.trim();
            // if (!nomValue) {
            // alert("Le nom est requis !");
            // return;
            // }
        } else {
            // Formulaire SPÉCIALITÉ
            formData.append('nom', specialiteForm.nom);
            formData.append('description', specialiteForm.description);
            formData.append('is_specialite', '1'); // '1' = true
            // nomValue = specialiteForm.nom.trim();
            // if (!nomValue) {
            // alert("Le nom est requis: SPECIALITES !");
            // return;
            // }
        }
        const nomValue = formType === 'menu'
            ? menuForm.nom.trim()
            : specialiteForm.nom.trim();

        if (!nomValue) {
            alert(formType === 'menu' ? "Le nom est requis !" : "Le nom est requis pour la spécialité !");
            return;
        }

        // const formData = new FormData();
        formData.append('nom', nomValue); // ← on envoie le trimmé
        
        
        // Photo pour SPÉCIALITÉ
        // if (photo) {
        //     data.append('photo', photo);
        // }

        // try {
        //     await addDish(data); // Modifie addDish pour accepter FormData directement
        //     resetForm();
        //     setShowForm(false);
        // } catch (err) {
        //     console.error("Erreur complète:", err.response?.data);
        //     alert("Erreur: " + JSON.stringify(err.response?.data?.errors || "Inconnue"));
        // }
          // Ajouter la photo si présente (uniquement pour spécialités)
        if (photo) {
            formData.append('photo', photo);
        }

        try {
            await addDish(formData); // ✅ On passe directement le FormData
            resetForm();
            setShowForm(false);
        } catch (err) {
            if (err.response && err.response.status === 422) {
                console.error('Erreur 422 - Détails :', err.response.data);
                alert('Données invalides. Voir la console.');
            } else {
                console.error('Erreur réseau ou autre :', err);
            }
        }
        
    };
    const resetForm = () => {
        setMenuForm({ nom: '', prix: '', categorie: 'cafes', type: '', description: '' });
        setPhoto(null);
        setSpecialiteForm({ nom: '', description: '' });
        setPreview(null);
    };

    const getDisplayedItems = () => {
        if (filtreType === 'menu') return dishes;
        if (filtreType === 'specialites') return specialites;
        return [...dishes, ...specialites].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    };
    

    return (
        <div className="space-y-6">
        <h3 className="text-2xl font-bold text-secondary"></h3>

        {/* LIGNE OUTILS */}
        <div className="flex flex-wrap items-center gap-4">
            <button
            onClick={() => setShowForm(true)}
            className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition"
            >
            Ajouter un article
            </button>

            {/* Menu déroulant Catégorie */}
            <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Catégorie:</label>
            <select
                value={filtreCategorie}
                onChange={(e) => setFiltreCategorie(e.target.value)}
                disabled={filtreType === 'specialites'}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            >
                <option value="all">Tous</option>
                {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
                ))}
            </select>
            </div>

            {/* Onglets Type */}
            <div className="flex bg-gray-200 rounded-lg p-1">
            {['tous', 'menu', 'specialites'].map((t) => (
                <button
                key={t}
                onClick={() => setFiltreType(t)}
                className={`px-4 py-1 rounded-md text-sm capitalize transition ${
                    filtreType === t ? 'bg-white shadow' : 'hover:bg-gray-300'
                }`}
                >
                {t === 'specialites' ? 'Spécialités' : t}
                </button>
            ))}
            </div>
        </div>

        {/* FORMULAIRE MODAL */}
        {showForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
                <h4 className="text-xl font-bold mb-4">Nouvel article</h4>

                {/* Choix type */}
                <div className="flex gap-4 mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                    type="radio"
                    name="formType"
                    checked={formType === 'menu'}
                    onChange={() => setFormType('menu')}
                    />
                    <span>Menu (plat)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                    type="radio"
                    name="formType"
                    checked={formType === 'specialite'}
                    onChange={() => setFormType('specialite')}
                    />
                    <span>Spécialité (carrousel)</span>
                </label>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                {/* Nom MENU/SPECIALITE */}
                <div>
                    <label className="block text-sm font-medium mb-1">Nom *</label>
                    <input
                        required
                        value={formType === 'menu' ? menuForm.nom : specialiteForm.nom}
                        onChange={(e) => {
                        if (formType === 'menu') {
                            setMenuForm({ ...menuForm, nom: e.target.value });
                        } else {
                            setSpecialiteForm({ ...specialiteForm, nom: e.target.value });
                        }
                        }}
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>

                {/* <div>
                    <input
                    required
                    value={specialiteForm.nom}
                    onChange={(e) => setSpecialiteForm({ ...specialiteForm, nom: e.target.value })}
                    />
                </div> */}

                {/* Champs MENU uniquement */}
                {formType === 'menu' && (
                    <>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                        <label className="block text-sm font-medium mb-1">Catégorie *</label>
                        <select
                            required
                            value={menuForm.categorie}
                            onChange={(e) => setMenuForm({ ...menuForm, categorie: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg"
                        >
                            {CATEGORIES.map((c) => (
                            <option key={c.value} value={c.value}>{c.label}</option>
                            ))}
                        </select>
                        </div>
                        <div>
                        <label className="block text-sm font-medium mb-1">Prix * (TDN)</label>
                        <input
                            type="number"
                            required
                            value={menuForm.prix}
                            onChange={(e) => setMenuForm({ ...menuForm, prix: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Type (optionnel)</label>
                        <input
                        value={menuForm.type}
                        onChange={(e) => setMenuForm({ ...menuForm, type: e.target.value })}
                        placeholder="Ex: Plat, Dessert..."
                        className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>
                    </>
                )}

                {/* Photo SPÉCIALITÉ uniquement */}
                {formType === 'specialite' && (
                    <div>
                    <label className="block text-sm font-medium mb-1">Photo *</label>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInput}
                        onChange={handlePhoto}
                        required={formType === 'specialite'}
                        className="hidden"
                    />
                    <button
                        type="button"
                        onClick={() => fileInput.current.click()}
                        className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary"
                    >
                        📷 {preview ? 'Changer la photo' : 'Ajouter une photo'}
                    </button>
                    {preview && (
                        <img src={preview} alt="Preview" className="mt-3 w-full h-48 object-cover rounded-lg" />
                    )}
                    </div>
                )}

                {/* Description MENU/SPECIALITES */}
                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                    rows={3}
                    value={menuForm.description}
                    onChange={(e) => setMenuForm({ ...menuForm, description: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>
                {/* <div>
                    <textarea
                    required
                    value={specialiteForm.description}
                    onChange={(e) => setSpecialiteForm({ ...specialiteForm, description: e.target.value })}
                    />
                </div> */}

                {/* Boutons */}
                <div className="flex gap-3 pt-4">
                    <button
                    type="button"
                    onClick={() => { resetForm(); setShowForm(false); }}
                    className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-100"
                    >
                    Annuler
                    </button>
                    <button
                    type="submit"
                    className="flex-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-orange-600"
                    >
                    Enregistrer
                    </button>
                </div>
                </form>
            </div>
            </div>
        )}

        {/* TABLEAU */}
        <div className="space-y-3">
            {getDisplayedItems().map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow p-4 flex justify-between items-start">
                <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                    {item.is_specialite ? (
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-bold">
                        SPÉCIALITÉ
                    </span>
                    ) : (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-bold">
                        {item.categorie?.toUpperCase()}
                    </span>
                    )}
                </div>
                
                <p className="font-semibold text-lg">{item.nom}</p>
                
                {!item.is_specialite && (
                    <p className="text-primary font-bold">{item.prix} MAD</p>
                )}
                
                {item.type && <p className="text-sm text-gray-500">Type: {item.type}</p>}
                
                {item.description && (
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                )}
                
                {item.photo_path && (
                    <img
                    src={`http://localhost:8000/storage/${item.photo_path}`}
                    alt={item.nom}
                    className="mt-2 w-24 h-24 object-cover rounded-lg"
                    />
                )}
                </div>

                <button
                onClick={() => deleteDish(item.id, item.is_specialite)}
                className="text-red-600 hover:text-red-800 text-sm"
                >
                Supprimer
                </button>
            </div>
            ))}
        </div>
        </div>
    );
}