import { useEffect, useState } from "react";
import Produto from "../../../model/Produto";
import CardProduto from "../card/CardProduto";
import { useNavigate } from "react-router-dom";
import { buscar } from "../../../service/Service";
import { Dna } from "react-loader-spinner";

function ListaProduto() {
    const [produtos, setProdutos] = useState<Produto[]>([]);

    let navigate = useNavigate();
  
    async function buscarProduto() {
      try {
        await buscar('/produtos', setProdutos);
      } catch (error: any) {
        console.log('Ocorre um erro com a busca dos dados.');
      }
    }
  
    useEffect(() => {
        buscarProduto();
    }, [produtos.length]);

    return (
      <>
        {produtos.length === 0 && (
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
              {produtos?.map((produto) => (
                <>
                  <CardProduto key={produto.id} produto={produto} />
                </>
              ))}
            </div>
          </div>
        </div>
      </>
    );
}

export default ListaProduto;