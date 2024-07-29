import React, { useState, useEffect } from 'react';

function Product(props) {
  const [visibility, setVisibility] = useState(true);
  const [count, setCount] = useState(props.initialCount || 0);

  useEffect(() => {
    setCount(props.initialCount || 0);
  }, [props.initialCount]);

  // Reset visibility when a new order is started
  useEffect(() => {
    if (props.initialCount === 0) {
      setVisibility(true);
    }
  }, [props.initialCount]);

  function increment() {
    setCount((prevCount) => prevCount + 1);
    props.onIncrement(props.id); // Trigger the increment event
  }

  function decrement() {
    if (count > 0) {
      setCount((prevCount) => prevCount - 1);
      props.onDecrement(props.id); // Trigger the decrement event
    }
  }

  function toggle() {
    setVisibility(!visibility);
    if (visibility) {
      increment(); 
    }
  }

  return (
    <div className="relative">
      <img src={props.image} alt={props.name} className={`rounded-lg w-full hover:border-2 border-solid border-[#C73A0F] ${!visibility ? "border-2 border-solid border-Red" : "border-none"}`}  />

      <div className="relative">
        <button
          onClick={toggle}
          className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 flex items-center justify-center gap-2 p-2 rounded-[100vmax] text-base w-[150px] font-bold text-Rose-900 bg-white border-2 border-Rose-300 shadow-lg hover:text-[#D56B4A] ${
            visibility ? 'flex' : 'hidden'
          }`}
        >
          <img
            src="./assets/images/icon-add-to-cart.svg"
            alt="Add to cart"
            className="w-4 h-4"
          />
          Add to Cart
        </button>

        {/* Quantity Increment/Decrement Button */}
        <div 
          className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 flex items-center justify-center gap-10 px-6 py-2 text-lg font-bold text-Rose-900 bg-Red border-2 border-Rose-300 rounded-full shadow-lg ${
            visibility ? 'hidden' : 'flex'
          }`}
        >
          <img
            src="./assets/images/icon-increment-quantity.svg"
            alt="Increment quantity"
            className="w-4 h-4"
            onClick={increment}
          />
          <span>{count}</span>
          <img
            src="./assets/images/icon-decrement-quantity.svg" 
            alt="Decrement quantity"
            className="w-4 h-4"
            onClick={decrement}
          />
        </div>
      </div>

      <div className="mt-[2rem]">
        <p className="text-gray-600 text-sm">{props.category}</p>
        <h2 className="text-xl font-bold text-Rose-900">{props.name}</h2>
        <p className="text-rose-500 font-bold text-lg">${props.price}</p>
      </div>
    </div>
  );
}

export default Product;
