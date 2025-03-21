
import './App.css';

import NotesListPage from './pages/NotesListPage'
import NotePage from './pages/NotePage'
import {Route,Routes} from "react-router-dom";

function App() {
  return (
    <div className="container dark">
      <div className="app">
        <Routes>
            <Route path="/" exact element={<NotesListPage/>}/>   
            <Route path="/note/:id/" element={<NotePage/>}/>
        </Routes>
      </div>
    </div>
  );

}

export default App;
