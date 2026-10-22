import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../services/supabaseClient';
import { useAuth } from '../../context/AuthContext';

export default function MyBookings() {
    const { user, isAdmin } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchBookings() {
            setIsLoading(true);

            let query = supabase
                .from('bookings')
                .select(`
          id,
          created_at,
          people_count,
          guest_names,
          total_price,
          user_id,
          user_email,
          tours (
            id,
            title,
            destination,
            image_url
          )
        `)
                .order('created_at', { ascending: false });

            if (!isAdmin && user) {
                query = query.eq('user_id', user.id);
            }

            const { data, error } = await query;

            if (error) {
                console.error('Error fetching bookings:', error.message);
            } else {
                setBookings(data || []);
            }
            setIsLoading(false);
        }

        if (user) {
            fetchBookings();
        }
    }, [user, isAdmin]);

    const handleCancelBooking = async (bookingId) => {
        if (window.confirm('Are you sure you want to cancel this booking?')) {
            const { error } = await supabase
                .from('bookings')
                .delete()
                .eq('id', bookingId);

            if (error) {
                alert('Error cancelling booking: ' + error.message);
            } else {
                setBookings((prev) => prev.filter((b) => b.id !== bookingId));
            }
        }
    };

    if (isLoading) {
        return (
            <div className="text-center py-5 my-5">
                <h4>Loading bookings...</h4>
            </div>
        );
    }

    return (
        <div className="untree_co-section my-5">
            <div className="container">
                <div className="row justify-content-center text-center mb-4">
                    <div className="col-lg-8">
                        <h2 className="section-title text-center">
                            {isAdmin ? 'All User Bookings (Admin)' : 'My Bookings'}
                        </h2>
                        <p className="text-muted">
                            {isAdmin
                                ? 'Manage and review all reservations made across the platform'
                                : 'Review your upcoming trips and guest details'}
                        </p>
                    </div>
                </div>

                {bookings.length === 0 ? (
                    <div className="text-center py-5 bg-light rounded shadow-sm">
                        <h5>No bookings found.</h5>
                        <p className="text-muted mb-3">
                            {isAdmin
                                ? 'No reservations have been placed yet.'
                                : "You haven't booked any tours yet."}
                        </p>
                        {!isAdmin && (
                            <Link to="/tours" className="btn btn-primary">
                                Explore Tours
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="row">
                        {bookings.map((booking) => {
                            const tour = booking.tours;
                            return (
                                <div key={booking.id} className="col-12 mb-4">
                                    <div className="card shadow-sm border-0">
                                        <div className="card-body p-4">
                                            <div className="row align-items-center">
                                                <div className="col-md-3 mb-3 mb-md-0">
                                                    <img
                                                        src={
                                                            tour?.image_url ||
                                                            'https://via.placeholder.com/300x200'
                                                        }
                                                        alt={tour?.title || 'Tour'}
                                                        className="img-fluid rounded w-100"
                                                        style={{ height: '150px', objectFit: 'cover' }}
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <h4 className="card-title mb-1">
                                                        {tour?.title || 'Tour Offer'}
                                                    </h4>
                                                    {isAdmin && (
                                                        <p className="mb-2 text-primary">
                                                            <strong>Booked by (Email):</strong> {booking.user_email || 'N/A'}
                                                        </p>
                                                    )}
                                                    <p className="text-muted mb-2">
                                                        <strong>Destination:</strong>{' '}
                                                        {tour?.destination || 'N/A'}
                                                    </p>
                                                    <p className="mb-1">
                                                        👥 <strong>People:</strong> {booking.people_count}
                                                    </p>
                                                    <p className="mb-2">
                                                        <strong>Guests:</strong>{' '}
                                                        {booking.guest_names?.join(', ') || 'N/A'}
                                                    </p>
                                                    <small className="text-muted">
                                                        Booked on:{' '}
                                                        {new Date(booking.created_at).toLocaleDateString()}
                                                    </small>
                                                </div>
                                                <div className="col-md-3 text-md-end mt-3 mt-md-0">
                                                    <div className="h4 text-success mb-3">
                                                        €{booking.total_price}
                                                    </div>
                                                    <button
                                                        onClick={() => handleCancelBooking(booking.id)}
                                                        className="btn btn-outline-danger btn-sm w-100"
                                                    >
                                                        Cancel Booking
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}