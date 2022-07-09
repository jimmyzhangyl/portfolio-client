import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,HashRouter, Route, Routes } from "react-router-dom";
import { Navigation, Footer, About, Skills, Projects, Contact, ProjectPage } from "../components";
import { createBrowserHistory } from "history";



function App() {
  const customHistory = createBrowserHistory();
  const root = process.env.REACT_APP_ROOT;
  useEffect(() => {
    document.title = "YL-Z Portfolio"
  }, []);

  return (
    <HashRouter >
      <Navigation />
      <Routes>
      <Route path={`/`} element={<About />} />
        <Route path={`/${root}/`} element={<About />} />
        <Route path={`/${root}/home`} element={<About />} />
        <Route path={`/${root}/about`} element={<About />} />
        <Route path={`/${root}/skills`} element={<Skills />} />
        <Route path={`/${root}/projects`} element={<Projects />}>
          <Route path=":project" element={<ProjectPage />} />
        </Route>
        <Route path={`/${root}/contact`} element={<Contact />} />
      </Routes>
      <Footer />
    </HashRouter>
  );
}

export default App;
