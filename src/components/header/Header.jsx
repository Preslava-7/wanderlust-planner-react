import { Link } from "react-router-dom";

export default function Header() {
    return (
        <>
            {/* Мобилно скрит панел */}
            <div className="site-mobile-menu site-navbar-target">
                <div className="site-mobile-menu-header">
                    <div className="site-mobile-menu-close">
                        <span className="icofont-close js-menu-toggle" />
                    </div>
                </div>
                <div className="site-mobile-menu-body" />
            </div>

            {/* Главна навигация */}
            <nav className="site-nav" style={{ backgroundColor: '#333' }}>
                <div className="container">
                    <div className="site-navigation">
                        {/* Логото води към началната страница ("/") */}
                        <Link to="/" className="logo m-0">
                            Wanderlust <span className="text-primary">.</span>
                        </Link>

                        {/* Главно меню (скрито на малки екрани заради d-none) */}
                        <ul className="js-clone-nav d-none d-lg-inline-block text-left site-menu float-right">
                            <li className="active">
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/tours">Tours</Link>
                            </li>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                            <li>
                                <Link to="/register">Register</Link>
                            </li>
                        </ul>

                        {/* Бутон "Хамбургер" за мобилни устройства */}
                        <a
                            href="#"
                            className="burger ml-auto float-right site-menu-toggle js-menu-toggle d-inline-block d-lg-none light"
                        >
                            <span className="icon-menu" /> {/* ТУК БЕШЕ ГРЕШКАТА - липсваше класа icon-menu */}
                        </a>
                    </div>
                </div>
            </nav>
        </>
    );
}