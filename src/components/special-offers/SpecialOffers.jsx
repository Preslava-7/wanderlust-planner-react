import { useState, useEffect } from "react";
import TourCard from "../tour-card/TourCard";
import { supabase } from "../../services/supabaseClient";

export default function SpecialOffers() {

    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTours() {
            const { data, error } = await supabase
                .from('tours')
                .select('*');

            if (error) {
                console.error('An error occured: ', error);
            } else {
                setOffers(data);
            }
            setLoading(false);
        }

        fetchTours();
    }, []);


    return (
        <div className="untree_co-section">
            <div className="container">
                <div className="row justify-content-center text-center mb-5">
                    <div className="col-lg-6">
                        <h2 className="section-title text-center mb-3">
                            Special Offers &amp; Discounts
                        </h2>
                    </div>
                </div>
                {loading ? (
            <div className="col-12 text-center py-5">
              <h5>Loading offers...</h5>
            </div>
          ) : offers.length > 0 ? (

            offers.map((offer) => (
              <TourCard
                key={offer.id}
                title={offer.title}
                destination={offer.destination}
                price={offer.price}
                image_url={offer.image_url} 
              />
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <p>There are no available offers.</p>
            </div>
          )}
            </div>
        </div>
    );
}
