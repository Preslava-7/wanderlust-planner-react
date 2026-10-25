import Services from '../services/Services'
import PopularDestinations from '../popular-destinations/PopularDestinations'
import Contacts from '../contacts/Contacts'
import SearchFilter from '../search-filter/SearchFilter'

export default function Home() {
    return (
        <>
            <SearchFilter />
            <Services />
            <PopularDestinations />
            <Contacts />
        </>
    );
}