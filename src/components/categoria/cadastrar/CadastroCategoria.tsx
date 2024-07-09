import { ChangeEvent, useEffect, useState } from "react";
import Categoria from "../../../model/Categoria";
import { useNavigate, useParams } from "react-router-dom";
import { atualizar, buscar, cadastrar } from "../../../service/Service";

function CadastroCategoria() {
    const [categoria, setCategoria] = useState<Categoria>({} as Categoria);
  
    let navigate = useNavigate();
  
    const { id } = useParams<{ id: string }>();
  
    async function buscarPorId(id: string) {
      await buscar(`/categorias/${id}`, setCategoria);
    }
  
    useEffect(() => {
      if (id !== undefined) {
        buscarPorId(id)
      }
    }, [id])
  
    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
      setCategoria({
        ...categoria,
        [e.target.name]: e.target.value,
      });
    }

    function retornar() {
      navigate("/categorias");
    }
  
    async function gerarNovaCategoria(e: ChangeEvent<HTMLFormElement>) {
      e.preventDefault()
  
      if (id !== undefined) {
        try {
          await atualizar(`/categorias`, categoria, setCategoria);
  
          alert('Categoria atualizado com sucesso')
          retornar()
  
        } catch (error: any) {
          alert('Erro ao atualizar o Tema')
          
        }
  
      } else {
        try {
          await cadastrar(`/categorias`, categoria, setCategoria)
  
          alert('Tema cadastrado com sucesso')
  
        } catch (error: any) {
          if (error.toString().includes('403')) {
            alert('Erro ao cadastrado o Tema')
          }
        }
        retornar()
      }

    }
  
    return (
      <div className="container flex flex-col items-center justify-center mx-auto">
        <h1 className="text-4xl text-center my-8">
          {id === undefined ? 'Cadastre um novo tema' : 'Editar tema'}
        </h1>
  
        <form className="w-1/2 flex flex-col gap-4" onSubmit={gerarNovaCategoria}>
          <div className="flex flex-col gap-2">
            <label htmlFor="descricao">Nome categoria</label>
            <input
              type="text"
              placeholder="Descrição"
              name='nome'
              className="border-2 border-slate-700 rounded p-2"
              value={categoria.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="descricao">Descrição do categoria</label>
            <input
              type="text"
              placeholder="Descrição"
              name='descricao'
              className="border-2 border-slate-700 rounded p-2"
              value={categoria.descricao}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <button
            className="rounded text-slate-100 bg-indigo-400 hover:bg-indigo-800 w-1/2 py-2 mx-auto block"
            type="submit"
          >
            {id === undefined ? 'Cadastrar' : 'Editar'}
          </button>
        </form>
      </div>
    );
  }
  
  export default CadastroCategoria;