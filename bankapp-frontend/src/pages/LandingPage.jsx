import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Stack, Box, Typography, Container, Slide, Fade } from '@mui/material';
import LazyImage from '../components/LazyImage';
import SecurityIcon from '@mui/icons-material/Security';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import { KeyboardArrowDown } from '@mui/icons-material';

const features = [
  {
    icon: <TouchAppIcon sx={{ fontSize: 48, color: '#2872c9' }} />,
    title: 'Easy to Use',
    desc: 'Our intuitive interface makes managing your finances simpler than ever before.',
  },
  {
    icon: <SecurityIcon sx={{ fontSize: 48, color: '#2872c9' }} />,
    title: 'Top-Notch Security',
    desc: 'We use the latest security measures to ensure your data and funds are always safe.',
  },
  {
    icon: <SupportAgentIcon sx={{ fontSize: 48, color: '#2872c9' }} />,
    title: '24/7 Support',
    desc: 'Our dedicated support team is here to help you around the clock with any questions.',
  },
];

const AnimatedHero = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => setShow(true), 200);
  }, []);
  return (
    <Fade in={show} timeout={1200}>
      <Box
        sx={{
          background: 'linear-gradient(135deg, #e3f0ff 0%, #f8fbff 100%)',
          boxShadow: 6,
          borderRadius: 6,
          p: { xs: 4, md: 8 },
          mt: { xs: 6, md: 12 },
          mb: { xs: 6, md: 12 },
          maxWidth: 600,
          mx: 'auto',
          position: 'relative',
          animation: 'floatCard 2.5s ease-in-out infinite',
        }}
      >
        <Typography variant="h2" fontWeight={800} color="#263d6b" mb={2} sx={{ fontSize: { xs: '2.2rem', md: '3.5rem' } }}>
          Secure & Simple Banking
        </Typography>
        <Typography variant="h6" color="text.secondary" mb={4}>
          Experience the future of banking with AuraBank. Seamless, secure, and always at your fingertips.
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            component={Link}
            to="/signup"
            variant="contained"
            size="large"
            sx={{ px: 4, fontWeight: 600, fontSize: '1.1rem', boxShadow: 3 }}
          >
            Get Started
          </Button>
          <Button
            component={Link}
            to="/login"
            variant="outlined"
            size="large"
            sx={{ px: 4, fontWeight: 600, fontSize: '1.1rem' }}
          >
            Login
          </Button>
        </Stack>
        <style>
          {`
            @keyframes floatCard {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-12px); }
            }
          `}
        </style>
      </Box>
    </Fade>
  );
};

const AnimatedFeatures = () => (
  <Container maxWidth="lg" sx={{ py: 10 }}>
    <Typography variant="h3" fontWeight={700} color="#263d6b" align="center" mb={8}>
      Why Choose AuraBank?
    </Typography>
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' },
        gap: 6,
        px: { xs: 2, md: 8 },
      }}
    >
      {features.map((f, i) => (
        <Slide direction="up" in={true} timeout={700 + i * 300} key={f.title}>
          <Box
            sx={{
              background: '#fff',
              borderRadius: 4,
              boxShadow: 3,
              p: 5,
              textAlign: 'center',
              transition: 'transform 0.3s',
              '&:hover': { transform: 'scale(1.04)', boxShadow: 6 },
            }}
          >
            <Box mb={2} sx={{ animation: 'iconPop 1.2s cubic-bezier(.68,-0.55,.27,1.55) forwards' }}>
              {f.icon}
            </Box>
            <Typography variant="h5" fontWeight={600} color="#263d6b" mb={1}>
              {f.title}
            </Typography>
            <Typography color="text.secondary">{f.desc}</Typography>
            <style>
              {`
                @keyframes iconPop {
                  0% { transform: scale(0.7); opacity: 0; }
                  60% { transform: scale(1.2); opacity: 1; }
                  100% { transform: scale(1); }
                }
              `}
            </style>
          </Box>
        </Slide>
      ))}
    </Box>
  </Container>
);

const ScrollDownIndicator = () => {
  const scrollToFeatures = () => {
    document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box
      onClick={scrollToFeatures}
      sx={{
        position: 'absolute',
        bottom: { xs: '20px', md: '40px' },
        left: '50%',
        transform: 'translateX(-50%)',
        cursor: 'pointer',
        animation: 'bounce 2s infinite',
        '&:hover': {
          opacity: 0.7,
        },
      }}
    >
      <KeyboardArrowDown
        sx={{
          fontSize: '48px',
          color: '#2872c9',
          filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.3))',
        }}
      />
      <style>
        {`
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0) translateX(-50%);
            }
            40% {
              transform: translateY(-20px) translateX(-50%);
            }
            60% {
              transform: translateY(-10px) translateX(-50%);
            }
          }
        `}
      </style>
    </Box>
  );
};

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <AppBar position="sticky" color="default" elevation={1} sx={{ backgroundColor: 'white' }}>
        <Toolbar
          disableGutters
          sx={{
            justifyContent: 'space-between',
            width: '100%',
            px: 5,
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
      <main className="flex-grow container mx-auto flex flex-col items-center justify-center text-center px-4 relative">
        <AnimatedHero />
        <ScrollDownIndicator />
      </main>

      {/* Features Section */}
      <section id="features" className="w-full bg-white">
        <AnimatedFeatures />
      </section>

      {/* About Us Section */}
      <section id="about" className="w-full bg-gray-100 py-16">
        <Container maxWidth="md">
          <Typography variant="h3" fontWeight={700} color="#263d6b" align="center" mb={6}>
            About AuraBank
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center" sx={{ fontSize: '1.15rem' }}>
            Founded on the principles of trust and innovation, AuraBank is dedicated to revolutionizing the banking experience.
            We believe in making financial management accessible and straightforward for everyone. Our mission is to empower you
            with the tools and support you need to achieve your financial goals, all while ensuring the highest level of security for your peace of mind.
          </Typography>
        </Container>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="w-full bg-white py-16">
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" fontWeight={700} color="#263d6b" mb={6}>
            Get in Touch
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={4}>
            Have questions? We're here to help.
          </Typography>
          <Button
            href="mailto:support@aurabank.com"
            variant="contained"
            size="large"
            sx={{
              px: 6,
              py: 2,
              fontWeight: 600,
              fontSize: '1.1rem',
              background: 'linear-gradient(90deg,#2872c9 0%,#263d6b 100%)',
              boxShadow: 3,
              borderRadius: 2,
              transition: 'transform 0.2s',
              '&:hover': { background: 'linear-gradient(90deg,#263d6b 0%,#2872c9 100%)', transform: 'scale(1.05)' },
            }}
          >
            Contact Us
          </Button>
        </Container>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 bg-gray-800 text-center text-white">
        <p>&copy; 2025 AuraBank. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;