import { useState } from "react";
import Todo from "./components/Todo";
import Notes from "./components/Notes";

export default function App(){
  const [page, setPage] = useState("");
  return(
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a href="/" className="navbar-brand">Noted</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item"><a className="nav-link" style={{cursor: "pointer"}} onClick={() => setPage("todo")}>Todo</a></li>
              <li className="nav-item"><a className="nav-link" style={{cursor: "pointer"}} onClick={() => setPage("notes")}>Notes</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {page == "todo" && <Todo/>}
      {page == "notes" && <Notes/>}
    </div>
  );
}