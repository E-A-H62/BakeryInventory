import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './LandingPage.css';

const LandingPage: React.FC = () => {
    return (
        <div id="page-wrapper">
            <nav className="nav-menu">
                <a href="/">Home Page</a>
                <a href="/inventory">Bakery Inventory</a>
            </nav>

            <section id="banner">
                <div className="container">
                    <div className="inner">
                        <header>
                            <h2>Welcome to Our Bakery</h2>
                        </header>
                        <p>Discover our delicious treats and fresh baked goods.</p>
                        <footer>
                            <ul className="buttons">
                                <li><a href="#main" className="button fit scrolly">Tell Me More</a></li>
                            </ul>
                        </footer>
                    </div>
                </div>
            </section>

            <article id="main">
                <div className="wrapper container special-alt">
                    <header>
                        <h2>About Us</h2>
                        <p>This is the about section of the website.</p>
                    </header>

                    <section className="wrapper container special-alt">
                        <header>
                            <h2>Main Section</h2>
                        </header>
                        <p>This is for another main section of the website.</p>
                    </section>

                    <section className="container special">
                        <header className="schedule">
                            <h2>Schedule</h2>
                            <p>This section will display the bakery's schedule for the week.</p>
                        </header>

                        <div className="schedule">
                            <section>
                                <header>
                                    <h3>MONDAY</h3>
                                </header>
                                <p>Hours to be determined.</p>
                                <header>
                                    <h3>TUESDAY</h3>
                                </header>
                                <p>Hours to be determined.</p>
                                <header>
                                    <h3>WEDNESDAY</h3>
                                </header>
                                <p>Hours to be determined.</p>
                                <header>
                                    <h3>THURSDAY</h3>
                                </header>
                                <p>Hours to be determined.</p>
                                <header>
                                    <h3>FRIDAY</h3>
                                </header>
                                <p>Hours to be determined.</p>
                            </section>
                        </div>
                    </section>
                </div>
            </article>

            <section id="cta">
                <div className="container">
                    <header>
                        <h2>More Information</h2>
                        <p>This section will contain more information about bakery (such as discord links).</p>
                    </header>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
