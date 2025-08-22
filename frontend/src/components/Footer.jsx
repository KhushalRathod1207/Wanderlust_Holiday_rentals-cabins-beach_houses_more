import React from "react";
import '../index.css';

const Footer = () => {
    return (
        <>
            <hr className="my-0" />
            <footer className="bg-white" role="contentinfo">
                <div className="container py-4">
                    <div className="row g-4">
                        {/* Support */}
                        <div className="col-md-4 mb-4 con">
                            <h6 className="fw-bold mb-3">Support</h6>
                            <ul className="list-unstyled">
                                <li>
                                    <a href="#" className="text-dark text-decoration-none hover-underline">
                                        Help Centre
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-dark text-decoration-none hover-underline">
                                        WanCover
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-dark text-decoration-none hover-underline">
                                        Anti-discrimination
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-dark text-decoration-none hover-underline">
                                        Disability support
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-dark text-decoration-none hover-underline">
                                        Cancellation options
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-dark text-decoration-none hover-underline">
                                        Report neighbourhood concern
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Hosting */}
                        <div className="col-md-4 mb-4 con">
                            <h6 className="fw-bold mb-3">Hosting</h6>
                            <ul className="list-unstyled">
                                <li>
                                    <a href="#" className="text-dark text-decoration-none hover-underline">
                                        Wanderlust your home
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-dark text-decoration-none hover-underline">
                                        WanderCover for Hosts
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-dark text-decoration-none hover-underline">
                                        Hosting resources
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-dark text-decoration-none hover-underline">
                                        Community forum
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-dark text-decoration-none hover-underline">
                                        Hosting responsibly
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-dark text-decoration-none hover-underline">
                                        Join a free Hosting class
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Wanderlust */}
                        <div className="col-md-4 mb-4 con">
                            <h6 className="fw-bold mb-3">Wanderlust</h6>
                            <ul className="list-unstyled">
                                <li>
                                    <a href="#" className="text-dark text-decoration-none hover-underline">
                                        Newsroom
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-dark text-decoration-none hover-underline">
                                        New features
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-dark text-decoration-none hover-underline">
                                        Careers
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-dark text-decoration-none hover-underline">
                                        Investors
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-dark text-decoration-none hover-underline">
                                        Wanderlust.org emergency stays
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Footer */}
                    <div className="border-top pt-4 mt-2 d-flex flex-column flex-md-row justify-content-between align-items-center">
                        <div className="d-flex flex-wrap align-items-center mb-3 mb-md-0">
                            <span className="text-secondary me-2 small">© 2025 Wanderlust, Inc.</span>
                            <span className="text-secondary mx-2 small">·</span>
                            <a href="#" className="text-secondary text-decoration-none hover-underline small">
                                Privacy
                            </a>
                            <span className="text-secondary mx-2 small">·</span>
                            <a href="#" className="text-secondary text-decoration-none hover-underline small">
                                Terms
                            </a>
                            <span className="text-secondary mx-2 small">·</span>
                            <a href="#" className="text-secondary text-decoration-none hover-underline small">
                                Company details
                            </a>
                        </div>
                        <div className="d-flex align-items-center">
                            <div className="d-flex align-items-center me-4">
                                <i className="fa-solid fa-globe me-2 text-secondary"></i>
                                <a href="#" className="text-secondary text-decoration-none hover-underline small">
                                    English (IN)
                                </a>
                            </div>
                            <div className="d-flex align-items-center me-4">
                                <span className="text-secondary small">₹ INR</span>
                            </div>
                            <div className="d-flex align-items-center">
                                <a href="https://github.com/KhushalRathod1207" className="text-secondary me-3">
                                    <i className="fa-brands fa-square-github fa-lg"></i>
                                </a>
                                <a href="https://www.linkedin.com/in/khushal-rathod/" className="text-secondary me-3">
                                    <i className="fa-brands fa-linkedin fa-lg"></i>
                                </a>
                                <a href="#" className="text-secondary">
                                    <i className="fa-brands fa-square-facebook fa-lg"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
