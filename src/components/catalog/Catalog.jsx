import { useState, useEffect } from 'react';
import TourCard from '../tour-card/TourCard'; 
import { supabase } from '../../services/supabaseClient'; // Импортираме връзката с базата

export default function Catalog() {
  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAllTours() {
      const { data, error } = await supabase
        .from('tours')
        .select('*');

      if (error) {
        console.error('Грешка при зареждане на каталога:', error.message);
      } else {
        setTours(data);
      }
      setIsLoading(false);
    }

    fetchAllTours();
  }, []);

  return (
    <div className="untree_co-section">
      <div className="container">
        <div className="row justify-content-center text-center mb-5">
          <div className="col-lg-6">
            <h2 className="section-title text-center mb-3">All Tours</h2>
            <p>Explore all our wonderful travel packages and find your next dream destination.</p>
          </div>
        </div>

        <div className="row">
          {isLoading ? (
            <div className="col-12 text-center py-5">
              <h5>Loading catalog...</h5>
            </div>
          ) : tours.length > 0 ? (
            tours.map((tour) => (
              <TourCard
                key={tour.id}
                title={tour.title}
                destination={tour.destination}
                price={tour.price}
                imageUrl={tour.image_url}
              />
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <p>There are no tours.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}