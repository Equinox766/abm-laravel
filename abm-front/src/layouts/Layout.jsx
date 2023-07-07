import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

export default function layout() {
  return (
    <>
      <div className='md:flex'>
        <Sidebar />
          <main className='flex-1 md:h-screen bg-gray-700 p-1'>
            <Outlet />
          </main>
      </div>
    </>
  )
}
