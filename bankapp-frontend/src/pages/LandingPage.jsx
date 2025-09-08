import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Stack } from '@mui/material';
import LazyImage from '../components/LazyImage';

const LandingPage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Header */}
            <AppBar position="sticky" color="default" elevation={1} sx={{ backgroundColor: 'white' }}>
                <Toolbar
                    disableGutters // 👈 1. Remove default padding
                    sx={{
                        justifyContent: 'space-between',
                        width: '100%',
                        px: 5 // 👈 2. Add your own smaller padding (e.g., 16px)
                    }}
                >
                    {/* Logo */}
                    <LazyImage
                        src="/images/aurabank-logo.png"
                        alt="AuraBank Logo"
                        className="w-40 h-auto"
                        placeholder={true}
                    />

                    {/* Desktop Navigation */}
                    <Stack
                        direction="row"
                        spacing={4}
                        sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}
                    >
                        <Button component="a" href="#features" sx={{ color: 'text.secondary' }}>
                            Features
                        </Button>
                        <Button component="a" href="#about" sx={{ color: 'text.secondary' }}>
                            About
                        </Button>
                        <Button component="a" href="#contact" sx={{ color: 'text.secondary' }}>
                            Contact
                        </Button>
                    </Stack>

                    {/* Auth Buttons */}
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{ display: { xs: 'none', md: 'flex' } }}
                    >
                        <Button
                            component={Link}
                            to="/login"
                            variant="contained"
                        >
                            Login
                        </Button>
                        <Button
                            component={Link}
                            to="/signup"
                            variant="outlined"
                        >
                            Sign Up
                        </Button>
                    </Stack>
                </Toolbar>
            </AppBar>

            {/* Hero Section */}
            <main className="flex-grow container mx-auto flex flex-col items-center justify-center text-center px-4 py-20">
                <h2 className="text-5xl font-extrabold text-[#263d6b] mb-4">
                    Secure & Simple Banking
                </h2>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                    Experience the future of banking with AuraBank. We offer a seamless and secure platform for all your financial needs.
                </p>
            </main>

            {/* Features Section */}
            <section id="features" className="w-full bg-white py-16">
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

            {/* About Us Section */}
            <section id="about" className="w-full bg-gray-100 py-16">
                <div className="container mx-auto text-center px-8">
                    <h3 className="text-3xl font-bold text-[#263d6b] mb-6">About AuraBank</h3>
                    <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                        Founded on the principles of trust and innovation, AuraBank is dedicated to revolutionizing the banking experience. We believe in making financial management accessible and straightforward for everyone. Our mission is to empower you with the tools and support you need to achieve your financial goals, all while ensuring the highest level of security for your peace of mind.
                    </p>
                </div>
            </section>

            {/* Contact Us Section */}
            <section id="contact" className="w-full bg-white py-16">
                <div className="container mx-auto text-center px-8">
                    <h3 className="text-3xl font-bold text-[#263d6b] mb-6">Get in Touch</h3>
                    <p className="text-lg text-gray-700 mb-8">
                        Have questions? We're here to help.
                    </p>
                    <a
                        href="mailto:support@aurabank.com"
                        className="bg-[#2872c9] text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-[#1a4f7d] transition-transform transform hover:scale-105"
                    >
                        Contact Us
                    </a>
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