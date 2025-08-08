import { useState } from 'react';

const Signup = () => {

  const [form, setForm] = useState({ fullName: '', email: '', phoneNumber: '', password: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    // Handle signup logic
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Image Block */}
      <div className="hidden md:flex flex-col justify-center items-center bg-[#083b70]">
        <img src="/images/generated-image.png" alt="Bank Illustration" className="h-screen max-h-screen w-auto object-contain" />
      </div>

      <div className='m-auto'>
        <button className="text-sm text-[#476488] hover:underline text-left">← Back</button>
        <div className="w-2xl flex flex-col justify-center p-12 m-auto bg-white">
          <h2 className="text-3xl font-semibold mb-2">Account Signup</h2>
          <p className="text-gray-500 mb-6">Join us for a seamless banking experience.</p>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-1 text-sm font-medium">Full Name</label>
              <input
                className="w-full border border-gray-300 rounded px-3 py-2"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Email</label>
              <input
                className="w-full border border-gray-300 rounded px-3 py-2"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Phone Number</label>
              <input
                className="w-full border border-gray-300 rounded px-3 py-2"
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Password</label>
              <input
                className="w-full border border-gray-300 rounded px-3 py-2"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#083b70] text-white py-2 rounded font-semibold mt-4 hover:bg-[#1653a2] transition"
            >
              Sign up
            </button>
          </form>
          <div className="mt-4 text-sm">
            Already have an account? <a href="/login" className="text-[#2872c9] hover:underline">Login here</a>
          </div>
        </div>
      </div>
      {/* Right Form Block */}

    </div>
  )
}

export default Signup
