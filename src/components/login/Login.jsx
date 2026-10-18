import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabaseClient';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            navigate('/');
        }

        setIsLoading(false);
    }

    return (
        <div className="untree_co-section">
            <div className="container">
                <div className="row justify-content-center mb-5">
                    <div className="col-lg-5">
                        <h2 className="section-title text-center mb-4">Login</h2>
                        <form className="contact-form" onSubmit={handleLogin}>
                            {error && <div className="alert alert-danger">{error}</div>}

                            <div className="form-group mb-3">
                                <label>Email address</label>
                                <input type="email"
                                    className="form-control"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required />
                            </div>
                            <div className="form-group mb-4">
                                <label>Password</label>
                                <input type="password"
                                    className="form-control"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required />
                            </div>
                            <button type="submit"
                                className="btn btn-primary btn-block w-100"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Logging in...' : 'Login'}
                            </button>
                        </form>
                        <p className="text-center mt-3">
                            Don't have an account? <Link to="/register">Register here</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}