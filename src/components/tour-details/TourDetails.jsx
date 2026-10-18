import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../../services/supabaseClient';

export default function TourDetails() {
  const { id } = useParams(); // Get the ID from the URL
  const [tour, setTour] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTourDetails() {
      const { data, error } = await supabase
        .from('tours')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error loading tour details:', error.message);
      } else {
        setTour(data);
      }
      setIsLoading(false);
    }

    fetchTourDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="col-12 text-center py-5 my-5">
        <h5>Loading tour details...</h5>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="col-12 text-center py-5 my-5">
        <h5>Tour not found.</h5>
        <Link to="/tours" className="btn btn-primary mt-3">Back to the catalog</Link>
      </div>
    );
  }

  return (
    <div className="untree_co-section my-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-7 mb-4">
            <img 
              src={tour.image_url} 
              alt={tour.title} 
              className="img-fluid rounded" 
            />
          </div>
          <div className="col-lg-5">
            <h2 className="section-title mb-3">{tour.title}</h2>
            <p className="text-primary font-weight-bold h3 mb-4">€{tour.price}</p>
            
            <ul className="list-unstyled mb-4">
              <li className="mb-2">
                <strong>Destination:</strong> {tour.destination}
              </li>
              <li className="mb-2">
                <strong>Month:</strong> {tour.month}
              </li>
            </ul>

            <p className="mb-4">
              Enjoy an unforgettable adventure in {tour.destination}! The package includes organized transportation, a professional tour guide, and accommodation at carefully selected hotels.
            </p>

            <Link to="/tours" className="btn btn-outline-primary">
              &larr; Back to the catalog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}