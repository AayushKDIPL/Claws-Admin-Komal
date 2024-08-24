import React, { useEffect, useState } from 'react';

function Category() {
  const [formData, setFormData] = useState({
    category: '',  // Added to store the selected category ID
    name: '',
    priority: ''
  });

  console.log(formData);

  const [getCategory, setGetCategory] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

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

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/subcategory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      alert('Subcategory added successfully!');
      console.log(data); // Optional: log the data returned from the server

      // Optionally, clear the form after successful submission
      setFormData({
        category: '',
        name: '',
        priority: ''
      });
    } catch (err) {
      console.error('Error:', err);
      alert('Error adding Subcategory');
    }
  };

  return (
    <div>
      <center>
        <h3 className="mt-5">Create New Subcategory</h3>
      </center>
      <br />
      <div className="row">
        <div className="col-8 offset-2">
          <form onSubmit={handleSubmit} className="need-validation">
            <div className="mb-3">
              <label htmlFor="category-type" className="form-label">Category Type:</label>
              <select
                name="category"  // Updated to match formData key
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
            </div>

            <div className="mb-3">
              <label htmlFor="name" className="form-label">Subcategory Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Add a catchy title"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">Please enter a valid title.</div>
            </div>

            <div className="mb-3">
              <label htmlFor="priority" className='form-label mb-2'>Priority:</label>
              <input
                type="number"
                id="priority"
                name="priority"  // Added name to match formData key
                value={formData.priority}
                onChange={handleChange}
                className='form-control'
                style={{ borderRadius: "5px" }}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-dark add-btn mt-3 mb-3 ms-1"
            >
              Add
            </button> 
          </form>
        </div>
      </div>
    </div>
  );
}

export default Category;
