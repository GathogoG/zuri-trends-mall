import  { useEffect, useState } from 'react';
import './BrowseByCategory.css';

const BrowseByCategory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/catalogs')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching catalog:', error));
  }, []);

  return (
    <section className="browse-by-category">
      <h2>Browse By Category</h2>
      <div className="categories">
        {categories.map(category => (
          <div key={category.id} className="category">
            <img src={`/public/assets/${category.name.toLowerCase().replace(' ', '-')}.jpg`} alt={category.name} />
            <h3>{category.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrowseByCategory;
