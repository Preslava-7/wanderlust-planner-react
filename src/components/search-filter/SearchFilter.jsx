import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "../../services/supabaseClient";

export default function SearchFilter() {
    const [destination, setDestination] = useState("");
    const [availableDestinations, setAvailableDestinations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchDestinations() {
            const { data, error } = await supabase
                .from('tours')
                .select('destination');

            if (error) {
                console.error('Error fetching destinations:', error.message);
            } else if (data) {
                const unique = [...new Set(data.map(item => item.destination).filter(Boolean))];
                setAvailableDestinations(unique);
            }
        }

        fetchDestinations();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (destination.trim()) {
            navigate(`/tours?search=${encodeURIComponent(destination.trim())}`);
        } else {
            navigate('/tours');
        }
    }

    return (
        <div className="hero">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-7">
                        <div className="intro-wrap">
                            <h1 className="mb-5">
                                <span className="d-block">Let's Enjoy Your</span> Trip In{" "}
                                <span className="typed-words" />
                            </h1>
                            <div className="row">
                                <div className="col-12">
                                    <form className="form" onSubmit={handleSearch}>
                                        <div className="row mb-2">
                                            <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-4">
                                                <select
                                                    name="destination"
                                                    id="destination"
                                                    className="form-control custom-select"
                                                    value={destination}
                                                    onChange={(e) => setDestination(e.target.value)}
                                                >
                                                   <option value="">Select Destination</option>
                                                   {availableDestinations.map((destination, index) => (
                                                    <option key={index} value={destination}>
                                                        {destination}
                                                    </option>
                                                   ))}
                                                </select>
                                            </div>
                                            <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-5">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="daterange"
                                                />
                                            </div>
                                            <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-3">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="# of People"
                                                />
                                            </div>
                                        </div>
                                        <div className="row align-items-center">
                                            <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-4">
                                                <input
                                                    type="submit"
                                                    className="btn btn-primary btn-block"
                                                    defaultValue="Search"
                                                />
                                            </div>
                                            <div className="col-lg-8">
                                                <label className="control control--checkbox mt-3">
                                                    <span className="caption">Save this search</span>
                                                    <input type="checkbox" defaultChecked="checked" />
                                                    <div className="control__indicator" />
                                                </label>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <div className="slides">
                            <img
                                src="images/hero-slider-1.jpg"
                                alt="Image"
                                className="img-fluid active"
                            />
                            <img
                                src="images/hero-slider-2.jpg"
                                alt="Image"
                                className="img-fluid"
                            />
                            <img
                                src="images/hero-slider-3.jpg"
                                alt="Image"
                                className="img-fluid"
                            />
                            <img
                                src="images/hero-slider-4.jpg"
                                alt="Image"
                                className="img-fluid"
                            />
                            <img
                                src="images/hero-slider-5.jpg"
                                alt="Image"
                                className="img-fluid"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}