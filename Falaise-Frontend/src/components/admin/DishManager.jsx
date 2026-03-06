import { useState, useEffect, useRef } from "react";
// import { useMenu } from "../../context/MenuContext";
import { useMenu } from "../../hooks/useMenu";
import axios from "axios";

const CATEGORIES = [
{ value: "sup", label: "Suppléments" },
{ value: "petitdej", label: "Petits Déjeuner" },
{ value: "cafes", label: "Cafés" },
{ value: "the", label: "Chauds" },
{ value: "jus", label: "Jus & Boissons" },
{ value: "froidglace", label: "Froids & Glace" },
{ value: "pate", label: "Crêpes-Gauffres-Pancakes" },
{ value: "pizzas", label: "Pizzas" },
{ value: "sandwich", label: "Tacos-Hamburger" },
{ value: "omelette", label: "Omelette" },
{ value: "salades", label: "Salades" },
{ value: "pates", label: "Pâtes" },
{ value: "mer", label: "Saveur Marine" },
{ value: "poulet", label: "Volailles" },
{ value: "specialte", label: "SPECIALITES FALAISE" },
{ value: "chicha", label: "Chichas" },
{ value: "desserts", label: "Desserts" },
];

export default function DishManager() {
    const { dishes, specialites, fetchDishes, fetchSpecialites, addDish, deleteDish } = useMenu();
    const [filtreType, setFiltreType] = useState('tous');
    const [filtreCategorie, setFiltreCategorie] = useState('all');
    const [showForm, setShowForm] = useState(false);
    const [formType, setFormType] = useState('menu');
    const [editingId, setEditingId] = useState(null);      // id de l’article en édition
    // const [editingIsSpecialite, setEditingIsSpecialite] = useState(false); // true si c’est une spécialité
    
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        
        if (formType === 'menu') {
            fetchDishes(filtreCategorie); // recharge les plats avec le filtre actuel
            // Formulaire MENU
            formData.append('nom', menuForm.nom);
            formData.append('prix', menuForm.prix);
            formData.append('categorie', menuForm.categorie);
            formData.append('type', menuForm.type || '');
            formData.append('description', menuForm.description || '');
            formData.append('is_specialite', '0'); // '0' = false
        } else {
            // Formulaire SPÉCIALITÉ
            fetchSpecialites(); // ou fetchDishes() si tu veux tout
            formData.append('nom', specialiteForm.nom);
            formData.append('description', specialiteForm.description);
            formData.append('is_specialite', '1'); // '1' = true
        }
        const nomValue = formType === 'menu'
            ? menuForm.nom.trim()
            : specialiteForm.nom.trim();

        if (!nomValue) {
            alert(formType === 'menu' ? "Le nom est requis !" : "Le nom est requis pour la spécialité !");
            return;
        }

        // const formData = new FormData();
        formData.append('nom', nomValue ); // ← on envoie le trimmé
        // Ajoute une directive pour simuler PATCH via POST
        if (photo) {
            formData.append('photo', photo);
        }
        try {
            if (editingId) {
            // ➜ MODE ÉDITION
            formData.append('_method', 'PATCH');
            await axios.post(`http://localhost:8000/api/dishes/${editingId}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            } else {
            // ➜ MODE CRÉATION
            await addDish(formData);
            }
            resetForm();
            setShowForm(false);
            setEditingId(null);
            // setEditingIsSpecialite(false);
            // re-fetch la liste
            fetchDishes(filtreCategorie);
            // fetchSpecialites();
        } catch (err) {
            console.warn('HTTP status :', err.response?.status);
            console.warn('Method used :', err.config?.method);   // ← GET / POST / PUT ?
            console.warn('URL :', err.config?.url);
            console.error(err);
            alert('Erreur lors de l’enregistrement');
        }

        // try {
        //     await addDish(formData); // ✅ On passe directement le FormData
        //     resetForm();
        //     setShowForm(false);
        // } catch (err) {
        //     if (err.response && err.response.status === 422) {
        //         console.error('Erreur 422 - Détails :', err.response.data);
        //         alert('Données invalides. Voir la console.');
        //     } else {
        //         console.error('Erreur réseau ou autre :', err);
        //     }
        // }
        
    };
    const resetForm = () => {
        setMenuForm({ nom: '', prix: '', categorie: 'cafes', type: '', description: '' });
        setPhoto(null);
        setSpecialiteForm({ nom: '', description: '' });
        setPreview(null);
        setEditingId(null);
        // setEditingIsSpecialite(false);
    };

    const startEdit = (item) => {
        if (item.is_specialite) return;
        setFormType('menu');
        setMenuForm({
        nom: item.nom,
        prix: item.prix,
        categorie: item.categorie,
        type: item.type || '',
        description: item.description || '',
        });
        setEditingId(item.id);
        // setEditingIsSpecialite(item.is_specialite);
        setShowForm(true);
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
                        <label className="block text-sm font-medium mb-1">Prix * (DT)</label>
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
                    <p className="text-primary font-bold">{item.prix} DT</p>
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
                {!item.is_specialite && (
                    <button
                        onClick={() => startEdit(item)}
                        className="text-blue-600 hover:text-blue-800 text-sm ml-2"
                    >
                        Modifier
                    </button>
                )}
            </div>
            ))}
        </div>
        </div>
    );
}