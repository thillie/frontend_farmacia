import { useEffect, useState } from "react";
import Categoria from "../../../model/Categoria";
import CardCategoria from "../card/CardCategoria";
import { useNavigate } from "react-router-dom";
import { buscar } from '../../../service/Service';
import { Dna } from 'react-loader-spinner';

function ListaCategoria() {
    const [categorias, setCategorias] = useState<Categoria[]>([]);

    let navigate = useNavigate();
  
    async function buscarCategorias() {
      try {
        await buscar('/categorias', setCategorias);
      } catch (error: any) {
        console.log('Ocorre um erro com a busca dos dados.');
      }
    }
  
    useEffect(() => {
      buscarCategorias();
    }, [categorias.length]);

    return (
      <>
        {categorias.length === 0 && (
          <Dna
            visible={true}
            height="200"
            width="200"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper mx-auto"
          />
        )}
        <div className="flex justify-center w-full my-4">
          <div className="container flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categorias?.map((categoria) => (
                <>
                  <CardCategoria key={categoria.id} categoria={categoria} />
                </>
              ))}
            </div>
          </div>
        </div>
      </>
    );
}

export default ListaCategoria;