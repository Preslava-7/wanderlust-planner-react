export default function Header() {
    return (
        <nav className="site-nav">
            <div className="container">
                <div className="site-navigation">
                    <a href="index.html" className="logo m-0">
                        Tour <span className="text-primary">.</span>
                    </a>
                    <ul className="js-clone-nav d-none d-lg-inline-block text-left site-menu float-right">
                        <li className="active">
                            <a href="index.html">Home</a>
                        </li>
                        <li className="has-children">
                            <a href="#">Dropdown</a>
                            <ul className="dropdown">
                                <li>
                                    <a href="elements.html">Elements</a>
                                </li>
                                <li>
                                    <a href="#">Menu One</a>
                                </li>
                                <li className="has-children">
                                    <a href="#">Menu Two</a>
                                    <ul className="dropdown">
                                        <li>
                                            <a href="#">Sub Menu One</a>
                                        </li>
                                        <li>
                                            <a href="#">Sub Menu Two</a>
                                        </li>
                                        <li>
                                            <a href="#">Sub Menu Three</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#">Menu Three</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="services.html">Services</a>
                        </li>
                        <li>
                            <a href="about.html">About</a>
                        </li>
                        <li>
                            <a href="contact.html">Contact Us</a>
                        </li>
                    </ul>
                    <a
                        href="#"
                        className="burger ml-auto float-right site-menu-toggle js-menu-toggle d-inline-block d-lg-none light"
                        data-toggle="collapse"
                        data-target="#main-navbar"
                    >
                        <span />
                    </a>
                </div>
            </div>
        </nav>
    );
}