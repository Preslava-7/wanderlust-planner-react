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

  const [peopleCount, setPeopleCount] = useState(1);
  const [guestNames, setGuestNames] = useState(['']);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState('');
  const [isBooking, setIsBooking] = useState(false);

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

  const handlePeopleCountChange = (count) => {
    const newCount = Math.max(1, parseInt(count) || 1);
    setPeopleCount(newCount);

    setGuestNames((prevNames) => {
      const updated = [...prevNames];
      if (newCount > updated.length) {
        while (updated.length < newCount) updated.push('');
      } else {
        updated.length = newCount;
      }
      return updated;
    });
  };

  const handleNameChange = (index, value) => {
    const updated = [...guestNames];
    updated[index] = value;
    setGuestNames(updated);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingError('');

    if (guestNames.some((name) => !name.trim())) {
      setBookingError('Please enter full names for all guests.');
      return;
    }

    setIsBooking(true);

    const totalPrice = (tour.price || 0) * peopleCount;

    const { error } = await supabase.from('bookings').insert([
      {
        tour_id: id,
        user_id: user.id,
        user_email: user.email,
        people_count: peopleCount,
        guest_names: guestNames,
        total_price: totalPrice,
      },
    ]);

    setIsBooking(false);

    if (error) {
      setBookingError('Failed to complete booking: ' + error.message);
    } else {
      setBookingSuccess(true);
    }
  };

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
            <h2>{tour.title}</h2>
            <h4 className="text-primary mb-3">€{tour.price} per person</h4>
            <p className="text-muted"><strong>Destination:</strong> {tour.destination}</p>
            <p>{tour.description}</p>


            <Link to="/tours" className="btn btn-outline-primary">
              &larr; Back to the catalog
            </Link>

            {isAdmin && (
              <div className="mt-4 pt-3 border-top">
                <p className="text-muted"><small>Admin Controls:</small></p>
                <Link to={`/tours/${id}/edit`} className="btn btn-warning me-2">
                  Edit Tour
                </Link>
                <button onClick={handleDelete} className="btn btn-danger">
                  Delete Tour
                </button>
              </div>
            )}

            {user && !isAdmin && (
              <div className="card mt-4 p-3 bg-light border-0 shadow-sm">
                <h4>Book This Tour</h4>

                {bookingSuccess ? (
                  <div className="alert alert-success mt-2">
                    Booking successful! Pack your bags for {tour.destination}.
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="mt-3">
                    {bookingError && <div className="alert alert-danger">{bookingError}</div>}

                    <div className="form-group mb-3">
                      <label className="form-label">Number of People:</label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        className="form-control"
                        value={peopleCount}
                        onChange={(e) => handlePeopleCountChange(e.target.value)}
                      />
                    </div>

                    {guestNames.map((name, index) => (
                      <div className="form-group mb-2" key={index}>
                        <label className="form-label"><small>Guest {index + 1} Full Name:</small></label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder={`Enter name for guest #${index + 1}`}
                          required
                          value={name}
                          onChange={(e) => handleNameChange(index, e.target.value)}
                        />
                      </div>
                    ))}

                    <div className="mt-3 p-2 bg-white rounded border text-end">
                      <strong>Total Price: </strong>
                      <span className="text-success h5 mb-0">${(tour.price || 0) * peopleCount}</span>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-success w-100 mt-3"
                      disabled={isBooking}
                    >
                      {isBooking ? 'Confirming...' : 'Confirm Booking'}
                    </button>
                  </form>
                )}

                {!user && (
                  <div className="alert alert-info mt-4">
                    Please <Link to="/login">login</Link> to book this tour.
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}