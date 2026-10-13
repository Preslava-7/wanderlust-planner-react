import { useState } from 'react'
import './App.css'
import Header from './components/header/Header'
import SearchFilter from './components/search-filter/SearchFilter'
import Footer from './components/footer/Footer'
import Home from './components/home/Home'
import Catalog from './components/catalog/Catalog'
import Login from './components/login/Login'
import Register from './components/register/Register'
import { Route, Routes } from 'react-router-dom'

const NotFound = () => <div className="py-5 text-center mt-5"><h1>404 - Page Not Found</h1></div>;

function App() {
  const [count, setCount] = useState(0)

  return (<>


    <Header />
    <main>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tours' element={<Catalog />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </main>

    <SearchFilter />

    <Footer />
  </>
  )
}

export default App
