import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './paginas/home/Home'
import NavBar from './components/navbar/NavBar'
import Footer from './components/footer/Footer'
import Produto from './components/produto/listar/ListaProduto'
import Categoria from './components/categoria/listar/ListaCategoria'
import CardProduto from './components/produto/card/CardProduto'
import CardCategoria from './components/categoria/card/CardCategoria'
import CadastroCategoria from './components/categoria/cadastrar/CadastroCategoria'
import CadastroProduto from './components/produto/cadastrar/CadastroProduto'
import DeletarCategoria from './components/categoria/deletar/DeletarCategoria'
import DeletarProduto from './components/produto/deletar/DeletarProduto'

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <div className='min-h-[80vh]' >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />

            <Route path="/produtos" element={<Produto />} />
            <Route path="/categorias" element={<Categoria />} />

            <Route path="/cadastroCategoria" element={<CadastroCategoria />} />
            <Route path="/editarCategoria/:id" element={<CadastroCategoria />} />
            <Route path="/deletarCategoria/:id" element={<DeletarCategoria />} />

            <Route path="/cadastroProduto" element={<CadastroProduto />} />
            <Route path="/editarProduto/:id" element={<CadastroProduto />} />
            <Route path="/deletarProduto/:id" element={<DeletarProduto />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App;
