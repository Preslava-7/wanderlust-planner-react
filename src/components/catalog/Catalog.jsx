import { useState, useEffect } from 'react';
import TourCard from '../tour-card/TourCard';
import { supabase } from '../../services/supabaseClient'; // Импортираме връзката с базата

export default function Catalog() {
  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    async function fetchAllTours() {
      const { data, error } = await supabase
        .from('tours')
        .select('*');

      if (error) {
        console.error('Error fething tours:', error.message);
      } else {
        setTours(data || []);
      }
      setIsLoading(false);
    }

    fetchAllTours();
  }, []);

  const filteredTours = tours
    .filter((tour) => {
      const query = searchTerm.toLowerCase();
      const matchesTitle = tour.title?.toLowerCase().includes(query);
      const matchesDestination = tour.destination?.toLowerCase().includes(query);
      return matchesTitle || matchesDestination;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return 0;
    });

  if (isLoading) {
    return (
      <div className="text-center py-5 my-5">
        <h4>Loading catalog...</h4>
      </div>
    );
  }

  return (
    <div className="untree_co-section">
      <div className="container">
        <div className="row justify-content-center text-center mb-5">
          <div className="col-lg-6">
            <h2 className="section-title text-center mb-3">All Tours</h2>
            <p>Explore all our wonderful travel packages and find your next dream destination.</p>
          </div>
        </div>

        <div className="row mb-5 justify-content-between align-items-center bg-light p-3 rounded shadow-sm">
          <div className="col-md-6 mb-3 mb-md-0">
            <input
              type="text"
              className="form-control"
              placeholder="Search by destination or title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <select
              className="form-control"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Sort by: Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="row">
          {filteredTours.length > 0 ? (
            filteredTours.map((tour) => (
              <TourCard
                key={tour.id}
                id={tour.id}
                title={tour.title}
                destination={tour.destination}
                price={tour.price}
                image_url={tour.image_url}
              />
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <h5>No tours match your search criteria.</h5>
              <button
                onClick={() => { setSearchTerm(''); setSortBy('default'); }}
                className="btn btn-outline-primary mt-3"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}