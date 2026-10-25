import { useState } from "react";
import { useEffect } from "react";
import { supabase } from "../../services/supabaseClient";
import { Link } from "react-router-dom";

export default function PopularDestinations() {
    const [popularTours, setPopularTours] = useState([]);

    useEffect(() => {
        async function fetchPopular() {
            const { data, error } = await supabase
                .from('tours')
                .select('*')
                .limit(6); // Взема първите 6 оферти

            if (!error && data) {
                setPopularTours(data);
            }
        }
        fetchPopular();
    }, []);

    return (
        <section className="popular-section my-5">
            <h2 className="text-center mb-4">Popular Destinations</h2>
            <div className="row">
                {popularTours.map((tour) => (
                    <div key={tour.id} className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm">
                            <img src={tour.image_url} className="card-img-top" alt={tour.title} style={{ height: '200px', objectFit: 'cover' }} />
                            <div className="card-body">
                                <span className="badge bg-secondary mb-2">{tour.destination}</span>
                                <h5 className="card-title">{tour.title}</h5>
                                <p className="card-text text-primary fw-bold">€{tour.price}</p>
                                <Link to={`/tours/${tour.id}`} className="btn btn-outline-primary btn-sm">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}