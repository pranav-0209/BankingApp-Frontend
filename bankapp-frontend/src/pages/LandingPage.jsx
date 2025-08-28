import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Header */}
            <header className="w-full py-2 px-8 shadow-md bg-white">
                <div className="pt-2 pb-2 flex justify-start ">
                <img src="/images/aurabank-logo.png" alt="AuraBank Logo" className="w-40" />
            </div>
            </header>

            {/* Hero Section */}
            <main className="flex-grow container mx-auto flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-5xl font-extrabold text-[#263d6b] mb-4">
                    Secure & Simple Banking
                </h2>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                    Experience the future of banking with AuraBank. We offer a seamless and secure platform for all your financial needs.
                </p>
                <div className="flex space-x-4">
                    <Link
                        to="/login"
                        className="bg-[#2872c9] text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-[#1a4f7d] transition-transform transform hover:scale-105"
                    >
                        Login
                    </Link>
                    <Link
                        to="/signup"
                        className="bg-white text-[#2872c9] font-semibold px-8 py-3 rounded-lg shadow-lg border border-[#2872c9] hover:bg-gray-100 transition-transform transform hover:scale-105"
                    >
                        Sign Up
                    </Link>
                </div>
            </main>

            {/* Features Section */}
            <section className="w-full bg-white py-16">
                <div className="container mx-auto text-center">
                    <h3 className="text-3xl font-bold text-[#263d6b] mb-10">Why Choose AuraBank?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
                        <div className="p-6">
                            <h4 className="text-2xl font-semibold text-[#263d6b] mb-2">Easy to Use</h4>
                            <p className="text-gray-600">
                                Our intuitive interface makes managing your finances simpler than ever before.
                            </p>
                        </div>
                        <div className="p-6">
                            <h4 className="text-2xl font-semibold text-[#263d6b] mb-2">Top-Notch Security</h4>
                            <p className="text-gray-600">
                                We use the latest security measures to ensure your data and funds are always safe.
                            </p>
                        </div>
                        <div className="p-6">
                            <h4 className="text-2xl font-semibold text-[#263d6b] mb-2">24/7 Support</h4>
                            <p className="text-gray-600">
                                Our dedicated support team is here to help you around the clock with any questions.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="w-full py-6 bg-gray-800 text-center text-white">
                <p>&copy; 2025 AuraBank. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;