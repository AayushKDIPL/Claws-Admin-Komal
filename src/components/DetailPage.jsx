import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function DetailPage() {
  const { id } = useParams(); // Get the product ID from the route parameters
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/products/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>No product found</div>;

  return (
    <div>
      <div className="row">
        <div className="col-8 offset-2 mt-3">
          <h3>Product Details</h3>
          <br />
          <div className="card">
            <img src={product.img} className="card-img-top show-img" alt="listing_img" />
            <div className="card-body">
              <p className="card-text text-dark">
                <b className="me-2">Title:</b> {product.title}<br/>
                <b>Price:</b> {product.price}<br/>
                <b>Offer:</b> {product.offer}<br/>
                <b>Coupon:</b> {product.coupon}
              </p>
            </div>
          </div>
          <br />
          <div className="show-btns mb-5">
            <Link to={`/products/${id}/edit`} className="btn btn-dark show-e-btn">Edit</Link>
            <br />
            <form method="POST" action={`/api/products/${id}?_method=DELETE`}>
              <button type="submit" className="btn btn-dark del-btn">Delete</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
