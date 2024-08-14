import { useEffect, useState } from 'react';
import './BrowseByCategory.css';

const BrowseByCategory = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/catalogs')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching catalog:', error));
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredCategories = selectedCategory
    ? categories.filter(category => category.name === selectedCategory)
    : categories;

  return (
    <section className="browse-by-category">
      <h2>Browse By Category</h2>
      <div className="categories">
        {categories.map(category => (
          <button 
            key={category.id} 
            className="category" 
            onClick={() => handleCategoryClick(category.name)}
          >
            <img src={category.image_path} alt={category.name} />
            <h3>{category.name}</h3>
          </button>
        ))}
      </div>

      {selectedCategory && (
        <div className="filtered-categories">
          <h3>Selected Category: {selectedCategory}</h3>
          {filteredCategories.map(category => (
            <div key={category.id} className="category-item">
              <img src={category.image_path} alt={category.name} />
              <h3>{category.name}</h3>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default BrowseByCategory;