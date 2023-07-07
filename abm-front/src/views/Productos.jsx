export default function Productos() {
  // if(isLoading) return (
  //   <>
  //   <div className="bg-gray-700 w-full min-h-screen flex justify-center items-center">
  //     <div className="bg-slate-800 p-10 shadow-md rounded-xl relative">
  //       <Spiner />
  //     </div>
  //   </div>
  //   </>
  // );
  return (
    <aside>
        <div className="px-4 mt-6">
          <div className="dark:bg-slate-800 max-h-96 overflow-x-auto shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-800 dark:text-gray-100">
              <div className="flex flex-col">
                      <div className="overflow-x-auto">
                          <div className="py-3 pl-2">
                            <div className="flex justify-end">
                              <div className="max-w-xs">
                              <input type="button" value="Nuevo Producto" className="bg-yellow-600 rounded-full hover:bg-yellow-700 text-white w-full mt-5 p-3 uppercase font-medium cursor-pointer" />
                              </div>
                            </div>
                          </div>
                          <div className="p-1.5 w-full inline-block align-middle">
                              <div className="overflow-hidden border rounded-lg">
                                  <table className="min-w-full divide-y divide-gray-200">
                                      <thead className="bg-gray-900">
                                          <tr>
                                              <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-300 uppercase">
                                                  ID
                                              </th>
                                              <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-300 uppercase">
                                                  Descripción
                                              </th>
                                              <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-300 uppercase">
                                                  Estado
                                              </th>
                                              <th scope="col" className="px-6 py-3 text-xs font-bold text-right text-gray-300 uppercase">
                                                  Edit
                                              </th>
                                              <th scope="col" className="px-6 py-3 text-xs font-bold text-right text-gray-300 uppercase">
                                                  Delete
                                              </th>
                                          </tr>
                                      </thead>
                                      <tbody className="divide-y divide-gray-200">
                                          <tr>
                                              <td className="px-6 py-4 text-sm font-medium text-gray-300 whitespace-nowrap">
                                                  1
                                              </td>
                                              <td className="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
                                                  Jone Doe
                                              </td>
                                              <td className="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
                                                  jonne62@gmail.com
                                              </td>
                                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                                  <a
                                                      className="text-green-500 hover:text-green-700"
                                                      href="#"
                                                  >
                                                      Edit
                                                  </a>
                                              </td>
                                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                                  <a
                                                      className="text-red-500 hover:text-red-700"
                                                      href="#"
                                                  >
                                                      Delete
                                                  </a>
                                              </td>
                                          </tr>
                                      </tbody>
                                  </table>
                              </div>
                          </div>
                      </div>
              </div>
            </div>
          </div>
        </div>
    </aside>
  )
}
