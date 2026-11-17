import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", cost: "$15", description: "Produces oxygen at night." },
        { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", cost: "$12", description: "Filters formaldehyde." },
        { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2018/02/23/15/28/peace-lily-3175402_1280.jpg", cost: "$18", description: "Removes toxins." },
        { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/07/04/17/21/fern-5369680_1280.jpg", cost: "$14", description: "Natural humidifier." },
        { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/06/09/04/45/rubber-plant-5276632_1280.jpg", cost: "$20", description: "Easy to grow." },
        { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/09/15/45/aloe-vera-3304919_1280.jpg", cost: "$10", description: "Healing properties." }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        { name: "Lavender", image: "https://cdn.pixabay.com/photo/2017/04/26/13/18/flower-2262991_1280.jpg", cost: "$20", description: "Calming scent." },
        { name: "Jasmine", image: "https://cdn.pixabay.com/photo/2017/05/30/03/58/jasmine-2355557_1280.jpg", cost: "$22", description: "Sweet fragrance." },
        { name: "Rosemary", image: "https://cdn.pixabay.com/photo/2016/09/10/11/49/rosemary-1658872_1280.jpg", cost: "$15", description: "Herbaceous aroma." },
        { name: "Mint", image: "https://cdn.pixabay.com/photo/2016/03/05/22/45/mint-1239077_1280.jpg", cost: "$8", description: "Refreshing smell." },
        { name: "Lemon Balm", image: "https://cdn.pixabay.com/photo/2019/07/16/21/04/lemon-balm-4342084_1280.jpg", cost: "$12", description: "Citrus aroma." },
        { name: "Hyacinth", image: "https://cdn.pixabay.com/photo/2016/04/10/22/47/hyacinth-1320499_1280.jpg", cost: "$16", description: "Spring bloom." }
      ]
    },
    {
      category: "Insect Repellent Plants",
      plants: [
        { name: "Marigold", image: "https://cdn.pixabay.com/photo/2017/08/29/12/07/marigold-2693725_1280.jpg", cost: "$9", description: "Repels bugs." },
        { name: "Basil", image: "https://cdn.pixabay.com/photo/2016/08/21/18/47/basil-1610492_1280.jpg", cost: "$10", description: "Keeps flies away." },
        { name: "Citronella", image: "https://cdn.pixabay.com/photo/2019/08/06/15/06/citronella-4388796_1280.jpg", cost: "$18", description: "Mosquito deterrent." },
        { name: "Catnip", image: "https://cdn.pixabay.com/photo/2015/07/02/20/37/catnip-829548_1280.jpg", cost: "$11", description: "Repels insects." },
        { name: "Geraniums", image: "https://cdn.pixabay.com/photo/2017/06/15/19/22/geranium-2406830_1280.jpg", cost: "$14", description: "Pest deterrent." },
        { name: "Pennyroyal", image: "https://cdn.pixabay.com/photo/2018/06/29/12/36/plant-3505706_1280.jpg", cost: "$13", description: "Natural insect guard." }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart(prev => ({ ...prev, [plant.name]: true }));
  };

  return (
    <div>
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', background: '#333', color: '#fff' }}>
        <h2 onClick={() => setShowCart(false)} style={{ cursor: 'pointer' }}>Paradise Nursery</h2>
        <div>
          <span onClick={() => setShowCart(false)} style={{ marginRight: '20px', cursor: 'pointer' }}>Plants</span>
          <span onClick={() => setShowCart(true)} style={{ cursor: 'pointer' }}>Cart ({totalCartItems})</span>
        </div>
      </nav>
      {!showCart ? (
        <div style={{ padding: '20px' }}>
          {plantsArray.map((cat, idx) => (
            <div key={idx}>
              <h2>{cat.category}</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {cat.plants.map((plant, pIdx) => (
                  <div key={pIdx} style={{ border: '1px solid #ccc', padding: '15px', width: '200px' }}>
                    <img src={plant.image} alt={plant.name} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
                    <h3>{plant.name}</h3>
                    <p>{plant.cost}</p>
                    <button 
                      onClick={() => handleAddToCart(plant)}
                      disabled={addedToCart[plant.name]}
                    >
                      {addedToCart[plant.name] ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
