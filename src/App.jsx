import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/header/Header'
import SearchFilter from './components/search-filter/SearchFilter'
import Footer from './components/footer/Footer'
import Home from './components/home/Home'
import Catalog from './components/catalog/Catalog'
import Login from './components/login/Login'
import Register from './components/register/Register'
import { Route, Routes } from 'react-router-dom'
import { supabase } from './services/supabaseClient'
import TourDetails from './components/tour-details/TourDetails'
import CreateTour from './components/create-tour/CreateTour'
import ProtectedRoute from './components/common/ProtectedRoute'

const NotFound = () => <div className="py-5 text-center mt-5"><h1>404 - Page Not Found</h1></div>;

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5 my-5">
        <h4>Loading...</h4>
      </div>
    );
  }

  return (<>


    <Header user={user} />
    <main>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tours' element={<Catalog />} />
        <Route path='/tours/:id' element={<TourDetails />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route element={<ProtectedRoute user={user} />}>
          <Route path="/create-tour" element={<CreateTour />} />
        </Route>

        <Route path='/*' element={<NotFound />} />
      </Routes>
    </main>

    <SearchFilter />

    <Footer />
  </>
  )
}

export default App
