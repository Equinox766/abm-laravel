export default function Productos() {
  return (
    <aside>
        <div className="px-4 mt-6">
          <div className="dark:bg-slate-800 max-h-96 overflow-x-auto shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-800 dark:text-gray-100">
                <table className="min-w-full divide-y divide-slate-800">
                    <thead className="bg-slate-800">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Cedula
                        </th>
                        <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Nombre y Apellido
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Fecha de Nacimiento
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Telefono
                        </th>

                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Nombre Gestor
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    {/* {data.map(producto => (
                  <Producto
                    key={producto.id}
                    producto={producto}
                    onUpdate={handleEditar}
                    onDestroy={handleDestroy}
                  />
                ))} */}
              </table>
            </div>
          </div>
        </div>
    </aside>
  )
}
