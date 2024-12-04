import { useState } from "react";

function App() {
  // Stato per il form
  const [formData, setFormData] = useState({
    title: "", // Titolo dell'articolo
    content: "", // Contenuto dell'articolo
    image: "", // URL dell'immagine dell'articolo
    category: "", // Categoria dell'articolo
    published: false, // Stato di pubblicazione (pubblicato o bozza)
  });

  // Stato per la lista degli articoli
  const [articles, setArticles] = useState([]);

  // Funzione per gestire i cambiamenti dei campi del form
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Aggiorno lo stato del form in base al tipo di input
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Funzione per aggiungere un nuovo articolo alla lista
  const addArticle = (e) => {
    e.preventDefault(); // Previene il comportamento predefinito del form (refresh della pagina)

    // Controlla che il titolo non sia vuoto o composto solo da spazi
    if (/^\s*$/.test(formData.title)) {
      return;
    }

    // Aggiungo il nuovo articolo all'array degli articoli
    setArticles([...articles, formData]);

    // Reset dei campi del form
    setFormData({
      title: "",
      content: "",
      image: "",
      category: "",
      published: false,
    });
  };

  // Funzione per eliminare un articolo dalla lista
  const deleteArticle = (index) => {
    // Filtro l'array degli articoli, rimuovendo quello con l'indice specificato
    setArticles(articles.filter((_, i) => i !== index));
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-3">Gestione Articoli</h1>

      {/* Form per aggiungere un nuovo articolo */}
      <form onSubmit={addArticle} className="mb-3">
        {/* Campo per il titolo */}
        <div className="mb-3">
          <label className="form-label">Titolo</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Inserisci il titolo"
          />
        </div>

        {/* Campo per il contenuto */}
        <div className="mb-3">
          <label className="form-label">Contenuto</label>
          <textarea
            className="form-control"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Inserisci il contenuto"
          />
        </div>

        {/* Campo per il link dell'immagine */}
        <div className="mb-3">
          <label className="form-label">Immagine</label>
          <input
            type="text"
            className="form-control"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Inserisci il link all'immagine"
          />
        </div>

        {/* Selezione della categoria */}
        <div className="mb-3">
          <label className="form-label">Categoria</label>
          <select
            className="form-select"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Seleziona una categoria</option>
            <option value="Elettronica">Elettronica</option>
            <option value="Moda">Moda</option>
            <option value="Automobilistica">Automobilistica</option>
          </select>
        </div>

        {/* Checkbox per lo stato di pubblicazione */}
        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            name="published"
            checked={formData.published}
            onChange={handleChange}
          />
          <label className="form-check-label">Pubblica</label>
        </div>

        {/* Pulsante per aggiungere l'articolo */}
        <button type="submit" className="btn btn-primary">
          Aggiungi Articolo
        </button>
      </form>

      {/* Lista degli articoli */}
      <ul className="list-group">
        {articles.map((article, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <h5>{article.title}</h5>
              <p>{article.content}</p>
              <p>
                <strong>Categoria:</strong> {article.category}
              </p>

              {article.image && (
                <img
                  src={article.image}
                  alt="Articolo"
                  style={{ maxWidth: "100px" }}
                />
              )}
              {/* Stato di pubblicazione */}
              <p>
                <strong>{article.published ? "Pubblicato" : "Bozza"}</strong>
              </p>
            </div>
            {/* Pulsante per eliminare l'articolo */}
            <button
              className="btn btn-danger btn-sm"
              onClick={() => deleteArticle(index)}
            >
              <i className="fas fa-trash-alt"></i> Elimina
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
