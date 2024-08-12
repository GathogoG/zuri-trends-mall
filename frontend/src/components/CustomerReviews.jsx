import './CustomerReviews.css';

const CustomerReviews = () => {
  return (
    <section className="customer-reviews">
      <h2>Customer Reviews</h2>
      <div className="reviews">
        <div className="review">
          <p>&quot;Great quality and fast shipping!&quot;</p>
          <h3>- Sarah</h3>
        </div>
        <div className="review">
          <p>&quot;Absolutely love the designs!&quot;</p>
          <h3>- John</h3>
        </div>
        <div className="review">
          <p>&quot;Will definitely buy again.&quot;</p>
          <h3>- Emily</h3>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
