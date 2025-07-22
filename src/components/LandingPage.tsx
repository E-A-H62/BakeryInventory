import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './LandingPage.css';


const LandingPage: React.FC = () => {
    const bakerySchedule = [
        { day: 'Monday', hours: 'TBD' },
        { day: 'Tuesday', hours: 'TBD' },
        { day: 'Wednesday', hours: 'TBD' },
        { day: 'Thursday', hours: 'TBD' },
        { day: 'Friday', hours: 'TBD' },
        { day: 'Saturday & Sunday', hours: 'TBD' }];  

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
                            <h1>Freshly Baked Every Day</h1>
                        </header>
                        <p>Enjoy our handcrafted pastries.</p>
                        <footer>
                            <a href="#main" className="primary-button">Learn More</a>
                        </footer>
                    </div>
                </div>
            </section>

            <main id="main">
                <section className="about-section">
                    <h2>About Us</h2>
                    <p>Here's the about section.</p>
                </section>

                <section className="schedule-section">
                    <h2>Bakery Schedule</h2>
                    <ul className="schedule-grid">
                        {bakerySchedule.map(({day, hours}) => (
                            <li key={day}>
                                <strong>{day}</strong>: {hours}
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="find-us">
                    <div className="find-us-content">
                        <h2>Where to Find Us?</h2>
                        <p>Visit us at 1234 Example Ave, Pasadena, CA.</p>
                        {/* Update image */}
                        <img src="/images/bakery-front.jpg" alt="Our bakery storefront" />
                    </div>
                </section>
            </main>

            <section id="cta">
                <div className="container">
                    <h2>Stay Connected</h2>
                    <p>Follow us on social or join our community for updates.</p>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
