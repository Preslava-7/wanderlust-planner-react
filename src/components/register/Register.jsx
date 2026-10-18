import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabaseClient';
export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) {
            setError(error.message);
        } else {
            alert('Registration successful! Please login.');
            navigate('/login');
        }
        setIsLoading(false);
    };

    return (
        <div className="untree_co-section">
            <div className="container">
                <div className="row justify-content-center mb-5">
                    <div className="col-lg-5">
                        <h2 className="section-title text-center mb-4">Register</h2>
                        <form className="contact-form" onSubmit={handleRegister}>

                            {error && <div className="alert alert-danger mb-3">{error}</div>}

                            <div className="form-group mb-3">
                                <label>Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group mb-4">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Create a password (min 6 symbols)"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} // Записваме въведената парола
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary btn-block w-100"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Registering...' : 'Register'}
                            </button>                        </form>
                        <p className="text-center mt-3">
                            Already have an account? 
                            <Link to="/login">Login here</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}