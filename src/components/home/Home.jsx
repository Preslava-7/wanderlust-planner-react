import Services from '../services/Services'
import StatsCounter from '../stats-counter/StatsCounter'
import PopularDestinations from '../popular-destinations/PopularDestinations'
import Testimonials from '../testimonials/Testimonias'
import SpecialOffers from '../special-offers/SpecialOffers'
import TourVideo from '../tour-video/TourVideo'
import Contacts from '../contacts/Contacts'
import SearchFilter from '../search-filter/SearchFilter'


export default function Home() {
    return (
        <>
            <SearchFilter />
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