import React, { useState } from 'react';

function Category() {
  const [formData, setFormData] = useState({
     
    name: '',
    priority: ''
  });

  console.log(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/category', {
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
      alert('Category added successfully!');
      console.log(data); // Optional: log the data returned from the server

      // Optionally, clear the form after successful submission
      setFormData({
        
        name: '',
        priority: ''
      });
    } catch (err) {
      console.error('Error:', err);
      alert('Error adding category');
    }
  };

  return (
    <div>
      <center>
        <h3 className="mt-5">Create New Category</h3>
      </center>
      <br />
      <div className="row">
        <div className="col-8 offset-2">
          <form onSubmit={handleSubmit} className="need-validation">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Category Name:</label>
              <input
                name="name"  // Updated to match formData key
                id="category-type"
                className="form-control"
                placeholder="Add a catchy title"
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
