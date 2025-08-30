import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import api from '../api';
import { TextField, Button, Stack } from '@mui/material'; // 👈 Import MUI components

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phoneNumber: '', password: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/signup', form);
      alert('Signup successful!');
      navigate('/login');
    } catch (error) {
      alert(error.response?.data?.message || 'Signup failed!');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Image Block */}
      <div className="hidden md:flex flex-col justify-center items-center bg-[#083b70]">
        <img src="/images/generated-image.png" alt="Bank Illustration" className="h-screen max-h-screen w-auto object-contain" />
      </div>

      <div className='m-auto'>
        <Link to="/" className="mb-8 text-sm text-[#476488] hover:underline text-left">← Back</Link>
        <div className="w-2xl flex flex-col justify-center p-12 m-auto bg-white">
          <h2 className="text-3xl font-semibold mb-2">Account Signup</h2>
          <p className="text-gray-500 mb-6">Join us for a seamless banking experience.</p>
          <form onSubmit={handleSignup}>
            <Stack spacing={2}> {/* 👈 Use Stack for spacing */}
              <TextField
                label="Full Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Phone Number"
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
              >
                Sign up
              </Button>
            </Stack>
          </form>
          <div className="mt-4 text-sm">
            Already have an account? <a href="/login" className="text-[#2872c9] hover:underline">Login here</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;