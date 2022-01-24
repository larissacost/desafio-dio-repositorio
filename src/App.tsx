import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './paginas/login/Login';
import Home from './paginas/home/Home';
import SobreNos from './paginas/sobre-nos/SobreNos';
import Navbar from './components/estaticos/navbar/NavBar';
import Footer from './components/estaticos/footer/Footer';
import CadastroUsuario from './paginas/cadastrousuario/CadastroUsuario';
import CadastroTema from './components/temas/cadastrotema/CadastroTema';
import ListaTema from './components/temas/listatema/ListaTema';
import ListaPostagem from './components/postagens/listapostagem/ListaPostagem';
import CadastroPost from './components/postagens/cadastropost/CadastroPost';

function App() {
  return (
    <div className="App">
     <Router>
      <Navbar />

      <Switch>
        <div style={{ minHeight: "100vh" }}>
        <Route exact path="/">
            <Login />
          </Route>
          <Route path="/login">
            <Login />
          </Route>

          <Route path="/home">
            <Home />
          </Route>

          <Route path="/sobre-nos">
            <SobreNos/>
          </Route>
          <Route path="/cadastrousuario">
          <CadastroUsuario />
          </Route>

          <Route path='/temas'>
            <ListaTema />
          </Route>
          <Route path='/posts'>
            <ListaPostagem />
          </Route>

          <Route exact path='/formularioPostagem'>
            <CadastroPost />
          </Route>
          <Route exact path='/formularioPostagem/:id'>
            <CadastroPost />
          </Route>
          <Route exact path='/formularioTema'>
            <CadastroTema />
          </Route>
          <Route exact path='/formularioTema/:id'>
            <CadastroTema />
          </Route>
        </div>
      </Switch>
      <Footer />
    </Router>
    </div>
  );
}

export default App;
