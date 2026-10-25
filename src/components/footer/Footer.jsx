import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Footer() {
    const { user, isAdmin } = useAuth();

    return (
        <div className="site-footer">
            <div className="inner first">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-lg-4">
                            <div className="widget">
                                <h3 className="heading">About Tour</h3>
                                <p>
                                    Far far away, behind the word mountains, far from the countries
                                    Vokalia and Consonantia, there live the blind texts.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-2 pl-lg-5">
                            <div className="widget">
                                <h3 className="heading">Explore</h3>
                                <ul className="links list-unstyled">
                                    <li>
                                        <Link to="/">Home</Link>
                                    </li>
                                    <li>
                                        <Link to="/tours">Tours</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-2">
                            <div className="widget">
                                <h3 className="heading">Account</h3>
                                <ul className="links list-unstyled">
                                    {user ? (
                                        <>
                                            <li>
                                                <Link to="/my-bookings">
                                                    {isAdmin ? "All Bookings" : "My Bookings"}
                                                </Link>
                                            </li>
                                            {isAdmin && (
                                                <li>
                                                    <Link to="/create-tour">Add Tour</Link>
                                                </li>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            <li>
                                                <Link to="/login">Login</Link>
                                            </li>
                                            <li>
                                                <Link to="/register">Register</Link>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <div className="widget">
                                <h3 className="heading">Contact</h3>
                                <ul className="list-unstyled quick-info links">
                                    <li className="email">
                                        <a href="mailto:support@wanderlust.com">support@wanderlust.com</a>
                                    </li>
                                    <li className="phone">
                                        <a href="tel:+12222123819">+1 222 212 3819</a>
                                    </li>
                                    <li className="address">
                                        43 Raymouth Rd. Baltemoer, London 3910
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="inner dark">
                <div className="container">
                    <div className="row text-center">
                        <div className="col-md-8 mb-3 mb-md-0 mx-auto">
                            <p>
                                Copyright ©. All Rights Reserved. — Designed with love by{" "}
                                <a href="https://untree.co" className="link-highlight">
                                    Untree.co
                                </a>{" "}
                                {/* License information: https://untree.co/license/ */}Distributed
                                By{" "}
                                <a href="https://themewagon.com" target="_blank">
                                    ThemeWagon
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}