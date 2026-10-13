import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className="untree_co-section">
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-lg-5">
            <h2 className="section-title text-center mb-4">Login</h2>
            <form className="contact-form">
              <div className="form-group mb-3">
                <label>Email address</label>
                <input type="email" className="form-control" placeholder="Enter your email" />
              </div>
              <div className="form-group mb-4">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Enter your password" />
              </div>
              <button type="submit" className="btn btn-primary btn-block w-100">Login</button>
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