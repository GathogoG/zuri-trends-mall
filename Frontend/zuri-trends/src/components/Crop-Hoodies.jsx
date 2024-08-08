import React from 'react'

function CropHoodies() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/property', { timeout: 10000 });
        console.log('API response:', response.data); // Log the response
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.error('API response is not an array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleOrder = (product) => {
    navigate('/crophoodies', { state: { product } });
  };

  return (
    <div>Crop-Hoodies</div>
  )
}

export default CropHoodies;
