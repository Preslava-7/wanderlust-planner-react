import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabaseClient';
import { useAuth } from '../../context/AuthContext';

export default function TourDetails() {
  const { user, isAdmin } = useAuth();
  
  const { id } = useParams();
  const navigate = useNavigate();
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

  const handleDelete = async () => {
    const isConfirmed = window.confirm('Are you sure you want to delete this tour?');
    if (!isConfirmed) return;

    const { error } = await supabase
      .from('tours')
      .delete()
      .eq('id', id);

    if (error) {
      alert(`Error deleting tour: ${error.message}`);
    } else {
      navigate('/tours');
    }
  };

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

            {user?.user_metadata?.role === "admin" && (
              <>
                <Link to={`/tours/${id}/edit`} className="btn btn-warning ml-2">
                  Edit Tour
                </Link>
                <button onClick={handleDelete} className="btn btn-danger ml-2">
                  Delete Tour
                </button>
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}