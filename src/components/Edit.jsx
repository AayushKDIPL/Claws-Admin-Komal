import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Edit() {
  const { id } = useParams(); // Get the product ID from the route parameters
  const [product, setProduct] = useState({
    title: '',
    description: '',
    img: '',
    price: '',
    offer: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      alert('Product updated successfully!');
      navigate(`/products/${id}`);  // navigate
    } catch (err) {
      console.error('Error:', err);
      alert('Error updating product');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="edit-page">
        <br/>
        <center>
          <h3>Edit the Product Details</h3>
        </center>
        <div className="row">
          <div className="col-8 offset-2">
            <form onSubmit={handleSubmit} noValidate className="needs-validation">
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Product Name:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={product.title}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
                <div className="invalid-feedback">Please enter a valid Title</div>
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description:</label>
                <textarea
                  id="description"
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  className="form-control"
                  required
                ></textarea>
                <div className="invalid-feedback">Please enter a valid Description</div>
              </div>

              <div className="mb-3">
                <label htmlFor="img" className="form-label">Image:</label>
                <input
                  type="text"
                  id="img"
                  name="img"
                  value={product.img}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
                <div className="invalid-feedback">Please enter a valid Image Link</div>
              </div>
              
              <div className="row">
                <div className="mb-3 col-md-4">
                  <label htmlFor="price" className="form-label">Price:</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                  <div className="invalid-feedback">Please enter a valid Price</div>
                </div>

                <div className="mb-3 col-md-4">
                  <label htmlFor="offer" className="form-label">Offer:</label>
                  <input
                    type="text"
                    id="offer"
                    name="offer"
                    value={product.offer}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                  <div className="invalid-feedback">Please enter a valid Offer</div>
                </div>
              </div>

              <button type="submit" className="btn btn-dark edit-btn">Edit</button>
              <br/>
              <br/>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
