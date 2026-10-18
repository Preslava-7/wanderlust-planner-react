import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabaseClient';

export default function CreateTour() {
  const [title, setTitle] = useState('');
  const [destination, setDestination] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [month, setMonth] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { error } = await supabase
      .from('tours')
      .insert([
        {
          title,
          destination,
          price: Number(price),
          image_url: imageUrl,
          month,
        },
      ]);

    if (error) {
      setError(error.message);
    } else {

        navigate('/tours');
    }

    setIsLoading(false);
  };

  return (
    <div className="untree_co-section my-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <h2 className="section-title text-center mb-4">Add New Tour</h2>

            <form className="contact-form" onSubmit={handleSubmit}>
              {error && <div className="alert alert-danger mb-3">{error}</div>}

              <div className="form-group mb-3">
                <label>Tour Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Alpine Paradise Expedition"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label>Destination</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Switzerland"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label>Price (€)</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="e.g. 650"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label>Image URL</label>
                <input
                  type="url"
                  className="form-control"
                  placeholder="https://images.unsplash.com/..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  required
                />
              </div>

              <div className="form-group mb-4">
                <label>Month</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. August"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Tour...' : 'Create Tour'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}