import { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";

export const Signup = () => {
    // Vite requires the VITE_ prefix for environment variables
    const API = import.meta.env.VITE_BACKEND_URL 
    
    // Initialize the navigate function at the top level
    const navigate = useNavigate();

    const [Form, setForm] = useState({
        username: "",
        email: "", 
        password: "", 
        password2: "" 
    })
    const [message, setMessage] = useState({ text: null, type: null })

    const handlechange = (e) => {
        setForm({
            ...Form,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ text: "", type: "" });

        if (Form.password !== Form.password2) {
            setMessage({ text: "Passwords do not match", type: "error" })
            return
        }

        try {
            const resp = await fetch(`${API}/api/register/`, {
                method: 'POST',
                headers: {
                    // Corrected 'applications/json' to 'application/json'
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(Form)
            })

            const data = await resp.json()

            if (resp.ok) {
                setMessage({ text: "User successfully registered!", type: "success" })
                setTimeout(() => {
                    // Use the initialized navigate function here
                    navigate('/login') 
                }, 1500)
            } else {
                // Display the error message sent by your backend
                setMessage({ 
                    text: data.message || "Registration failed. Please try again.", 
                    type: "error" 
                })
            }
        
        } catch (error) {
            console.error(error);
            setMessage({ text: "Server connection failed.", type: "error" });
        }
    }

    return (
        <div className="w-full flex items-center justify-center h-screen flex-col">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold">
                    Signup
                </h1>
            </div>
            
            <div className="bg-white p-3 md:p-7 rounded-xl shadow-xl border border-gray-300 w-full max-w-lg">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                        <input 
                            type="text" 
                            name="username" 
                            value={Form.username} 
                            placeholder="Ali Khan" 
                            onChange={handlechange} 
                            required
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            value={Form.email} 
                            onChange={handlechange} 
                            placeholder="abc@gmail.com"
                            required
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            value={Form.password} 
                            onChange={handlechange} 
                            required
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Confirm Password</label>
                        <input 
                            type="password" 
                            name="password2" 
                            value={Form.password2} 
                            onChange={handlechange} 
                            required
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>
                    
                    <button 
                        type="submit"
                        className='w-full mt-4 bg-black cursor-pointer font-semibold py-3 px-4 rounded-xl text-white shadow-md transition-all duration-300 transform active:scale-98 flex justify-center items-center gap-2'> 
                        Signup
                    </button>
                    
                    <div className="text-md text-black-600 mb-1 text-center">
                        <p>Already have an account? <Link to='/Login' className="text-black-600 hover:underline cursor-pointer">Login</Link></p>
                    </div>

                    {message.text && (
                        <div className={`p-3 rounded-xl text-center font-medium mt-4 text-sm border 
                            ${message.type === 'success' 
                                ? 'bg-green-50 text-green-700 border-green-200' 
                                : 'bg-red-50 text-red-700 border-red-200'}`}>
                            {message.text}
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}