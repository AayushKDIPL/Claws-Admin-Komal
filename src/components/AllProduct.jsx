import React, { useState, useEffect } from "react";
import "../Style/Product.css";

const AllProduct = () => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(productData[0]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/product", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (Array.isArray(data.message)) {
          setProductData(data.message);
        } else {
          console.error("Expected an array but got:", data.message);
          setProductData([]);
        }
      } catch (e) {
        console.log("Failed to fetch products:", e);
        setError("Failed to fetch products");
        setProductData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSubmit = async (product) => {
    try {
      const response = await fetch("http://localhost:8000/api/subcategory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      const result = await response.json();
      console.log("Product added:", result);
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add product.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="product-page">
      <center>
        <h1 className="product-title">All Products</h1>
      </center>
      <div className="product-grid">
        {productData.length > 0 ? (
          productData.map((product) => (
            <div key={product._id} className="product-card">
              <div className="product-images">
                {product.images.length > 0 ? (
                  product.images.map((image, index) => (
                    <img
                      key={index}
                      src={`http://localhost:8000/${image}`}
                      className="product-img"
                      alt={`Product image ${index + 1}`}
                    />
                  ))
                ) : (
                  <p>No images available</p>
                )}
              </div>
              <div className="product-body">
                <h5 className="product-name">{product.name}</h5>
                <p className="product-price">
                  Price: ₹{product.price} &nbsp; Offer: {product.offer}% off
                </p>
                <p className="product-description">{product.description}</p>
                <button
                  onClick={() => handleSubmit(product)}
                  className="add-to-subcategory-btn"
                >
                  Add to Subcategory
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default AllProduct;
