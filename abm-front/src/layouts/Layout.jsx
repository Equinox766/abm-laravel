import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

export default function layout() {
  return (
    <>
      <div className='md:flex'>
        <Sidebar />
          <main className='flex-1 md:h-screen bg-gray-700 p-1'>
            <Outlet />
          </main>
      </div>
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  )
}
