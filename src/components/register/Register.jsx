import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabaseClient';
export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (signUpError) {
      if (signUpError.message.toLowerCase().includes('already registered') || signUpError.status === 422) {
        setError('An account with this email address already exists.');
      } else {
        setError(signUpError.message);
      }
      return;
    }

    if (data?.user && data?.user?.identities?.length === 0) {
      setError('An account with this email address already exists.');
      return;
    }

    navigate('/');
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
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group mb-4">
                                <label>Confirm Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Confirm password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
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