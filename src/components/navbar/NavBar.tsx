import { Link } from "react-router-dom"

function NavBar() {

    let navbarComponent = (
        <div className='w-full bg-indigo-900 text-white flex justify-center py-4 p-4'>
            <div className="container flex justify-between text-lg">
            <Link to='/home' className='text-2xl font-bold uppercase'>Farmácia Thillie</Link>

            <div className='flex gap-4'>
                <Link to='/produtos' className='hover:underline'>Produtos</Link>
                <Link to='/categorias' className='hover:underline'>Categorias</Link>
                <Link to='/cadastroProduto' className='hover:underline'>Cadastrar Produto</Link>
                <Link to='/cadastroCategoria' className='hover:underline'>Cadastrar Categoria</Link>
            </div>
            </div>
        </div>
    )
  
    return (
      <>
        {navbarComponent}
      </>
    )
  }

export default NavBar;