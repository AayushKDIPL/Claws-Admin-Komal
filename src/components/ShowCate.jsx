import React, { useEffect, useState } from 'react';

function ShowCate() {
  const [categories, setCategories] = useState({ merchandise: [], equipment: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [getCategory, setGetCategory] = useState([]);
  console.log(getCategory);

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
        // setCategories({ 
        //   merchandise: data.filter(cat => cat.section === 'merchandise'), 
        //   equipment: data.filter(cat => cat.section === 'equipment')
        // });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = async (id, section) => {
    try {
      const response = await fetch(`http://localhost:8000/api/categories/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Update the state to remove the deleted category
      setCategories(prevCategories => ({
        ...prevCategories,
        [section]: prevCategories[section].filter(cat => cat._id !== id)
      }));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <center>
        <h1 className="h-cat mt-5">CATEGORY LIST</h1>
      </center>
      <div className="div-body">
        <div className="row mt-5 ms-0">
          <div className="card-cate col-sm-9 mb-3">
            <div className="card b-cate">
              <div className="card-header card card-1 ms-5 mb-3 btn-outline-info">
                Merchandise
              </div>
              <ul className="list-group list-group-flush">
                {categories.merchandise.map(cat => (
                  <li key={cat._id} className="list-group-item category-border">
                    {cat.title}
                    <button 
                      className="btn btn-outline-danger me-4 del-btn category-b"
                      onClick={() => handleDelete(cat._id, 'merchandise')}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="card-cate col-sm-3">
            <div className="card b-cate">
              <div className="card-header card ms-5 card-1 mb-3">
                Equipment
              </div>
              <ul className="list-group list-group-flush">
                {categories.equipment.map(cat => (
                  <li key={cat._id} className="list-group-item text-bg-light category-border">
                    {cat.title}
                    <button 
                      className="btn btn-outline-danger me-4 del-btn category-b"
                      onClick={() => handleDelete(cat._id, 'equipment')}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <br />
          <div className="div-cat">
            <button className="btn cat-btn m-4 btn-danger">Add Category</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowCate;
