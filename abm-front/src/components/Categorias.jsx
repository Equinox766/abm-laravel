export default function Categoria({categoria, location}) {
    const { id, url, nombre } = categoria;
    const {pathname} = location

    const resaltarCategoriaActual = () => pathname === url ? "bg-slate-700 text-teal-400" : "bg-slate-800 text-white";
    
    return (
        <button 
            className={`${resaltarCategoriaActual()} flex gap-4 w-full p-3 hover:text-teal-400 hover:bg-slate-700  cursor-pointer`}
        >
            <p className="text-lg font-bold cursor-pointer text-left truncate">{nombre}</p>           
        </button>
    )
}
