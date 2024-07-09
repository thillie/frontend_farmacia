import { useNavigate, useParams } from "react-router-dom";
import Categoria from "../../../model/Categoria";
import { ChangeEvent, useEffect, useState } from "react";
import Produto from "../../../model/Produto";
import { atualizar, buscar, cadastrar } from "../../../service/Service";

function CadastroProduto() {
    let navigate = useNavigate();

    const { id } = useParams<{ id: string }>();
  
    const [categorias, setCategorias] = useState<Categoria[]>([]);
  
    const [categoria, setCategoria] = useState<Categoria>({
      id: 0,
      nome: '',
      descricao: '',
      produto: []
    });
  
    const [produto, setProduto] = useState<Produto>({
      id: 0,
      nome: '',
      descricao: '',
      quantidade: 0,
      laboratorio: '',
      preco: 0,
      foto: '',
      categoria: null
    });
  
    async function buscarProdutoPorId(id: string) {
      await buscar(`/produtos/${id}`, setProduto);
    }
  
    async function buscarCategoriaPorId(id: string) {
      await buscar(`/categorias/${id}`, setCategoria);
    }
  
    async function buscarCategorias() {
      await buscar('/categorias', setCategorias);
    }
  
    useEffect(() => {
        buscarCategorias();
      if (id !== undefined) {
        buscarProdutoPorId(id);
        console.log(categoria);
  
      }
    }, [id]);
  
    useEffect(() => {
        setProduto({
        ...produto,
        categoria: categoria,
      });
    }, [categoria]);
  
    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setProduto({
        ...produto,
        [e.target.name]: e.target.value,
        categoria: categoria
      });
    }
  
    function retornar() {
      navigate('/produtos');
    }
  
    async function gerarNovoProduto(e: ChangeEvent<HTMLFormElement>) {
      e.preventDefault();
  
      console.log({ produto });
  
      if (id != undefined) {
        try {
          await atualizar(`/produtos`, produto, setProduto);
          alert('Postagem atualizada com sucesso');
          retornar();
        } catch (error: any) {
          alert('Erro ao atualizar a Postagem');
          
        }
      } else {
        try {
          await cadastrar(`/produtos`, produto, setProduto);
  
          alert('Postagem cadastrada com sucesso');
          retornar();
        } catch (error: any) {
          alert('Erro ao cadastrar a Postagem');

        }
      }
    }
  
    const carregandoTema = categoria.descricao === '';
  
    return (
      <div className="container flex flex-col mx-auto items-center">
        <h1 className="text-4xl text-center my-8">{id !== undefined ? 'Editar Produto' : 'Cadastrar Produto'}</h1>
        
        <form onSubmit={gerarNovoProduto} className="flex flex-col w-1/2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="nome">Titulo do produto</label>
            <input
              value={produto.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              type="text"
              placeholder="Titulo"
              name="nome"
              required
              className="border-2 border-slate-700 rounded p-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="descricao">Descricao do produto</label>
            <input
              value={produto.descricao}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              type="text"
              placeholder="Descricao"
              name="descricao"
              required
              className="border-2 border-slate-700 rounded p-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="quantidade">Qtd. de produtos</label>
            <input
              value={produto.quantidade}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              type="text"
              placeholder="Qtd. de produtos"
              name="quantidade"
              required
              className="border-2 border-slate-700 rounded p-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="laboratorio">Laboratorio</label>
            <input
              value={produto.laboratorio}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              type="text"
              placeholder="Laboratorio"
              name="laboratorio"
              required
              className="border-2 border-slate-700 rounded p-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="preco">Preco</label>
            <input
              value={produto.preco}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              type="text"
              placeholder="Preco"
              name="preco"
              required
              className="border-2 border-slate-700 rounded p-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="foto">IMG</label>
            <input
              value={produto.foto}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              type="text"
              placeholder="foto"
              name="foto"
              required
              className="border-2 border-slate-700 rounded p-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p>Categoria do produto</p>
            <select name="categoria" id="categoria" className='border p-2 border-slate-800 rounded' onChange={(e) => buscarCategoriaPorId(e.currentTarget.value)}>
              <option value="" selected disabled>Selecione uma categoria</option>
              {categorias.map((categoria) => (
                <>
                  <option value={categoria.id} >{categoria.nome}</option>
                </>
              ))}
            </select>
          </div>
          <button disabled={carregandoTema} type='submit' className='rounded disabled:bg-slate-200 bg-indigo-400 hover:bg-indigo-800 text-white font-bold w-1/2 mx-auto block py-2'>
            {carregandoTema ? <span>Carregando</span> : id !== undefined ? 'Editar' : 'Cadastrar'}
          </button>
        </form>
      </div>
    );
}

export default CadastroProduto;