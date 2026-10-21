import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabaseClient';

export default function EditTour() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [destination, setDestination] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [month, setMonth] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchTour() {
      const { data, error } = await supabase
        .from('tours')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        setError('Failed to fetch tour details.');
      } else if (data) {
        setTitle(data.title || '');
        setDestination(data.destination || '');
        setPrice(data.price || '');
        setImageUrl(data.image_url || '');
        setMonth(data.month || '');
      }
      setIsLoading(false);
    }

    fetchTour();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const { error } = await supabase
      .from('tours')
      .update({
        title,
        destination,
        price: Number(price),
        image_url: imageUrl,
        month,
      })
      .eq('id', id);

    if (error) {
      setError(error.message);
      setIsSubmitting(false);
    } else {
      navigate(`/tours/${id}`); // Пренасочваме обратно към детайлите
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-5 my-5">
        <h4>Loading tour data...</h4>
      </div>
    );
  }

  return (
    <div className="untree_co-section my-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <h2 className="section-title text-center mb-4">Edit Tour</h2>

            <form className="contact-form" onSubmit={handleSubmit}>
              {error && <div className="alert alert-danger mb-3">{error}</div>}

              <div className="form-group mb-3">
                <label>Tour Title</label>
                <input
                  type="text"
                  className="form-control"
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
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label>Price ($)</label>
                <input
                  type="number"
                  className="form-control"
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
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-warning w-100"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Updating Tour...' : 'Update Tour'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}