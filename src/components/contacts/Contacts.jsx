import { Link } from "react-router-dom";

export default function Contacts() {
    return (
        <div className="py-5 cta-section">
            <div className="container">
                <div className="row text-center">
                    <div className="col-md-12">
                        <h2 className="mb-2 text-white">
                            Ready for Your Next Adventure?
                        </h2>
                        <p className="mb-4 lead text-white text-white-opacity">
                            Discover amazing destinations around the globe and book your dream trip in seconds.
                        </p>
                        <p className="mb-0">
                            <Link
                                to="/tours"
                                className="btn btn-outline-white text-white btn-md font-weight-bold"
                            >
                                Explore all tours
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}