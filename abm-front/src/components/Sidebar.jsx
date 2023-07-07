import {categorias} from '../data/categorias'
import Categoria from './Categorias'
import { Link, useLocation } from 'react-router-dom'

export default function Sidebar() {
  let location = useLocation()

  return (
    <aside className="flex flex-col justify-between bg-slate-800">
      <div className="p-4 h-10 text-center">
        <h1 className="text-slate-400 text-4xl  font-bold">
            SIMPLE<span className="font-extrabold text-teal-400">ABM</span>
        </h1>
      </div>      
      <div className='mt-10 flex-1'>
        {categorias.map(categoria => (
          <Link 
            to={categoria.url}
            key={categoria.id}
          >
            <Categoria
              location={location}
              categoria={categoria}
            />
          </Link>
        ))}
      </div>
    </aside>
  )
}
