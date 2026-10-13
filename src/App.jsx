import { useState } from 'react'
import './App.css'
import Header from './components/header/Header'
import SearchFilter from './components/search-filter/SearchFilter'
import Footer from './components/footer/Footer'
import Services from './components/services/Services'
import StatsCounter from './components/stats-counter/StatsCounter'
import PopularDestinations from './components/popular-destinations/PopularDestinations'
import Testimonials from './components/testimonials/Testimonias'
import SpecialOffers from './components/special-offers/SpecialOffers'
import TourVideo from './components/tour-video/TourVideo'
import Contacts from './components/Contacts'
import Home from './components/home/Home'

function App() {
  const [count, setCount] = useState(0)

  return (<>
    <div className="site-mobile-menu site-navbar-target">
      <div className="site-mobile-menu-header">
        <div className="site-mobile-menu-close">
          <span className="icofont-close js-menu-toggle" />
        </div>
      </div>
      <div className="site-mobile-menu-body" />
    </div>

    <Header />
    <SearchFilter />
    <Home/>
    
    <Footer />
  </>
  )
}

export default App
