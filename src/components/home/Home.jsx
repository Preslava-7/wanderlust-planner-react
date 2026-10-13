import Services from './components/services/Services'
import StatsCounter from './components/stats-counter/StatsCounter'
import PopularDestinations from './components/popular-destinations/PopularDestinations'
import Testimonials from './components/testimonials/Testimonias'
import SpecialOffers from './components/special-offers/SpecialOffers'
import TourVideo from './components/tour-video/TourVideo'
import Contacts from './components/Contacts'


export default function Home() {
    return (
        <>
            
            <Services />
            <StatsCounter />
            <PopularDestinations />
            <Testimonials />
            <SpecialOffers />
            <TourVideo />
            <Contacts />
        </>
    );
}