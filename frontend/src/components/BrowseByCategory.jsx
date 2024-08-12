import React from 'react';
import './BrowseByCategory.css';

const BrowseByCategory = () => {
  return (
    <section className="browse-by-category">
      <h2>Browse By Category</h2>
      <div className="categories">
        <div className="category">
          <img src="/public/assets/casual.jpg" alt="Casual" />
          <h3>Casual</h3>
        </div>
        <div className="category">
          <img src="/public/assets/formal.jpg" alt="Formal" />
          <h3>Formal</h3>
        </div>
        <div className="category">
          <img src="/public/assets/kids.jpg" alt="Kids Wear" />
          <h3>Kids Wear</h3>
        </div>
      </div>
    </section>
  );
};

export default BrowseByCategory;
