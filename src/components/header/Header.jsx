import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../services/supabaseClient";

export default function Header({ user }) {
    const [logoutError, setLogoutError] = useState("");

    const handleLogout = async () => {
        setLogoutError("");

        const { error } = await supabase.auth.signOut();
        if (error) {
            setLogoutError(error.message);
        }
    };

    return (
        <>
            <div className="site-mobile-menu site-navbar-target">
                <div className="site-mobile-menu-header">
                    <div className="site-mobile-menu-close">
                        <span className="icofont-close js-menu-toggle" />
                    </div>
                </div>
                <div className="site-mobile-menu-body" />
            </div>

            <nav className="site-nav" style={{ backgroundColor: '#333' }}>
                <div className="container">
                    <div className="site-navigation">
                        <Link to="/" className="logo m-0">
                            Wanderlust <span className="text-primary">.</span>
                        </Link>

                        <ul className="js-clone-nav d-none d-lg-inline-block text-left site-menu float-right">
                            {logoutError && (
                                <li className="text-danger px-2" role="alert">
                                    {logoutError}
                                </li>
                            )}
                            <li className="active">
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/tours">Tours</Link>
                            </li>
                            {user ? (
                                <>
                                <li>
                                    <Link to="/create-tour">Add Tour</Link>
                                </li>
                                    <li className="text-white px-2 my-auto">
                                        <small>{user.email}</small>
                                    </li>
                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="btn btn-outline-light btn-sm ml-2"
                                            style={{ marginTop: '5px' }}
                                        >
                                            Logout
                                        </button>
                                    </li>
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

                        <a
                            href="#"
                            className="burger ml-auto float-right site-menu-toggle js-menu-toggle d-inline-block d-lg-none light"
                        >
                            <span className="icon-menu" /> 
                        </a>
                    </div>
                </div>
            </nav>
        </>
    );
}