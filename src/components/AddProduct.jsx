import React, { useState, useEffect } from 'react';

function AddProduct() {
  const [getCategory, setGetCategory] = useState([]);
  const [getSubcategory, setGetSubcategory] = useState([]);

  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    colors: '',
    // isActive: 'false',
     
    subcategory: '',
    images:'',
    priority: ''
  });

  const [image, setImage] = useState(null); // State to hold the image file

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/category', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        setGetCategory(data.message);
      } catch (err) {
        console.log(err.message);
      }
    };

    const fetchSubcategories = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/subcategory', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        setGetSubcategory(data.message);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchCategories();
    fetchSubcategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files); // Update the state with the selected files
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('colors', formData.colors);
    // formDataToSend.append('isActive', formData.isActive);
    formDataToSend.append('priority', formData.priority);
    formDataToSend.append('subcategory', formData.subcategory);

    if (image) {
        Array.from(image).forEach(file => {
          formDataToSend.append('images', file); // Append each image file
        });
      }

    try {
      const response = await fetch('http://localhost:8000/api/product', {
        method: 'POST',
        body: formDataToSend
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      alert('Product added successfully!');
      console.log(data); // Optional: log the data returned from the server

      // Optionally, clear the form after successful submission
      setFormData({
        name: '',
        description: '',
        price: '',
        colors: '',
        // isActive: 'false',
        priority: '',
        subcategory: ''
      });
      setImage(null); // Clear the image input
    } catch (err) {
      console.error('Error:', err);
      alert('Error adding product');
    }
  };

  return (
    <div>
      <center>
        <h3>Create New Product</h3>
      </center>

      <div className="row">
        <div className="col-8 offset-2">
          <form onSubmit={handleSubmit} className="needs-validation">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Product Name:</label>
              <input
                type="text"
                name="name"
                placeholder="Add a catchy title"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">Please enter a valid Title</div>
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description:</label>
              <textarea
                name="description"
                cols="22"
                className="form-control"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
              <div className="invalid-feedback">Please enter a valid Description</div>
            </div>

            <div className="mb-3">
              <label htmlFor="img" className="form-label">Upload Image:</label>
              <input
                type="file"
                name="img"
                id="img"
                className="form-control"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
              <div className="invalid-feedback">Please upload an image.</div>
            </div>

            <div className="row">
              <div className="mb-3 col-md-4">
                <label htmlFor="price" className="form-label">Price:</label>
                <input
                  type="number"
                  name="price"
                  placeholder="1200"
                  className="form-control"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
                <div className="invalid-feedback">Please enter a valid Price</div>
              </div>

              <div className="mb-3 col-md-8">
                <label htmlFor="colors" className="form-label">Colors:</label>
                <input
                  type="text"
                  name="colors"
                  placeholder="#ABC123"
                  className="form-control"
                  value={formData.colors}
                  onChange={handleChange}
                  required
                />
                <div className="invalid-feedback">Please enter a valid Coupon code</div>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="priority" className="form-label">Priorities:</label>
              <input
                type="text"
                name="priority"
                placeholder="20%"
                className="form-control"
                value={formData.priority}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback"></div>
            </div>

            {/* <div className="mb-3">
              <label htmlFor="category" className="form-label">Category Type:</label>
              <select
                name="category"
                id="category-type"
                className="form-control"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category Type</option>
                {getCategory.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">Please select a category type.</div>
            </div> */}

            <div className="mb-3">
              <label htmlFor="subcategory" className="form-label">Subcategory Type:</label>
              <select
                name="subcategory"
                className="form-control"
                value={formData.subcategory}
                onChange={handleChange}
                required
              >
                <option value="">Select Subcategory Type</option>
                {getSubcategory.map((subcategory) => (
                  <option key={subcategory._id} value={subcategory._id}>
                    {subcategory.name}
                  </option>
                ))}
              </select>
            </div>

            <br />
            <button type="submit" className="btn btn-dark add-btn">Add</button>
            <br />
            <br />
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
