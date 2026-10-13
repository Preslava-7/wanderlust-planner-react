export default function TourCard({ title, destination, price, image_url }) {
  return (
    <div className="col-6 col-sm-6 col-md-6 col-lg-3 mb-4">
      <div className="media-1">
        <a href="#" className="d-block mb-3">
          <img src={image_url} alt={title} className="img-fluid" />
        </a>
        <span className="d-flex align-items-center loc mb-2">
          <span className="icon-room mr-3" />
          <span>{destination}</span>
        </span>
        <div className="d-flex align-items-center">
          <div>
            <h3><a href="#">{title}</a></h3>
            <div className="price ml-auto">
              <span>${price}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}