import './HeroSection.css';
import { useNavigate } from 'react-router-dom';


const HeroSection = () => {
  const navigate = useNavigate();


  const handleProducts = () => {
    navigate('/products'); 
  };


  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Find Clothes That Match Your Style</h1>
        <div className="hero-buttons">
          <button 
              onClick={() => handleProducts()} 
              className="shop-now"
            >
              Shop Now
            </button>
        </div>
      </div>
      <div className="brand-logos">
        <span>VERSACE</span>
        <span>ZARA</span>
        <span>GUCCI</span>
        <span>PRADA</span>
        <span>Calvin Klein</span>
      </div>
    </section>
  );
};

export default HeroSection;
