import { useState } from "react";

function App() {
  // Stato per gli articoli
  const [articles, setArticles] = useState([]);

  // Stato per il titolo dell'articolo
  const [title, setTitle] = useState("");

  // Funzione per aggiungere un articolo
  const addArticle = (e) => {
    e.preventDefault();

    // Controllo se il titolo è vuoto o composto solo da spazi
    if (/^\s*$/.test(title)) {
      return;
    }

    // Aggiungo l'articolo alla lista degli articoli
    setArticles([...articles, title]);

    // Resetto il campo di input
    setTitle("");
  };

  // Funzione per eliminare un articolo
  const deleteArticle = (index) => {
    const updatedArticles = articles.filter((_, i) => i !== index);

    // Aggiorno lo stato con la lista degli articoli modificata
    setArticles(updatedArticles);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-3">Articoli</h1>

      {/* Form per aggiungere un nuovo articolo */}
      <form onSubmit={addArticle} className="mb-3">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)} // Aggiorno lo stato `title` ad ogni cambiamento nell'input
            placeholder="Aggiungi titolo"
          />
          <button type="submit" className="btn btn-primary">
            Aggiungi
          </button>
        </div>
      </form>

      {/* Lista degli articoli */}
      <ul className="list-group">
        {articles.map((article, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {article} {/* Mostra il titolo dell'articolo */}
            <button
              className="btn btn-danger btn-sm"
              onClick={() => deleteArticle(index)} // Passo l'indice dell'articolo da eliminare
            >
              <i className="fas fa-trash-alt"></i>{" "}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
