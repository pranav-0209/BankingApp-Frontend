import { useState } from 'react';

const Login = () => {

    const [form, setForm] = useState({ fullName: '', password: '' });

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
    const handleSubmit = e => {
        e.preventDefault();
        // Handle login logic
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Image Block */}
            <div className="hidden md:flex flex-col justify-center items-center bg-[#083b70]">
                <img src="/images/generated-image.png" alt="Bank Illustration" className="h-screen max-h-screen w-auto object-contain" />
            </div>
            <div className='m-auto'>
                <button className="mb-8 text-sm text-[#476488] hover:underline text-left">← Back</button>
                <div className="max-w-5xl flex flex-col justify-center p-10 m-auto bg-white">
                    <h2 className="text-3xl font-semibold mb-2">Account Login</h2>
                    <p className="text-gray-500 mb-6">If you are already a member you can login with your email address and password.</p>
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label className="block mb-1 text-sm font-medium">Full Name</label>
                            <input
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                name="fullName"
                                value={form.fullName}
                                onChange={handleChange}
                                autoComplete="username"
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
                                autoComplete="current-password"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#083b70] text-white py-2 rounded font-semibold mt-4 hover:bg-[#1653a2] transition"
                        >
                            Login
                        </button>
                    </form>
                    <div className="mt-4 text-sm">
                        Don’t have an account? <a href="/signup" className="text-[#2872c9] hover:underline">Sign up here</a>
                    </div>
                </div>
            </div>
            {/* Right Form Block */}

        </div>
    )
}

export default Login
