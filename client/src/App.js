import {BrowserRouter as Router, Routes, Route, Redirect} from "react-router-dom";

import Articles from "./pages/Articles";
import Navigation from "./components/Navigation";
import Article from "./pages/Article";
import CreateArticle from "./pages/CreateArticle";
import CreateReference from "./pages/CreateReference";
import Reference from "./pages/Reference";

function App() {
  return (
    <>
      <Router>
        <Navigation/>
        {/* lista rute */}
        <Routes>
          <Route exact path="/" element={<Articles/>}/>
          <Route exact path ="/articleview/:id" element={<Article/>}></Route>
          {/* rutare pe baza id-ului de entitate copil */}
          <Route exact path ="/articleview/:articleId/reference/:id" element={<Reference/>}></Route>
          <Route exact path="/articlecreate" element={<CreateArticle/>}></Route>
          <Route exact path="/referencecreate" element={<CreateReference/>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
