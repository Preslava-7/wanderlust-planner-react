import { Link } from "react-router-dom";

export default function TourCard({ id, title, destination, price, image_url }) {
  const src = image_url || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80';
  return (
    <div className="col-6 col-sm-6 col-md-6 col-lg-3 mb-4">
      <div className="media-1">
        <Link to={`/tours/${id}`} className="d-block mb-3">
          <img src={src} alt={title} className="img-fluid" />
        </Link>
        <span className="d-flex align-items-center loc mb-2">
          <span className="icon-room mr-3" />
          <span>{destination}</span>
        </span>
        <div className="d-flex align-items-center">
          <div>
            <h3><Link to={`/tours/${id}`}>{title}</Link></h3>
            <div className="price ml-auto">
              <span>€{price}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}