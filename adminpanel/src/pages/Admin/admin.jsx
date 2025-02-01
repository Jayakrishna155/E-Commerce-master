import React from 'react'
import './admin.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import {Routes,Route} from 'react-router-dom'
import Addproduct from '../../components/Addproduct/Addproduct'
import Listproduct from '../../components/Listproduct/Listproduct'
export default function Admin() {
  return (
    <div className='admin'>
      <Sidebar/>
      <Routes>
          <Route path='/addproduct' element={<Addproduct/>} />
          <Route path ="/productlist" element={<Listproduct/>} />
      </Routes>
    </div>
  )
}
