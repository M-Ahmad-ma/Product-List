import React, { useState } from "react";
import data from "../data.json";
import Product from "./Product";
import Confirmation from "./Confirmation";

function Desserts() {
  const [cartItems, setCartItems] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleIncrement = (itemId) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === itemId);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        const item = data.find((item) => item.id === itemId);
        return [
          ...prevItems,
          {
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1,
            image: item.image,
          },
        ];
      }
    });
  };

  const handleDecrement = (itemId) => {
    setCartItems((prevItems) => {
      return prevItems
        .map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0);
    });
  };

  const handleConfirmOrder = () => {
    setShowConfirmation(true);
  };

  const handleNewOrder = () => {
    setShowConfirmation(false);
    setCartItems([]);
  };

  const totalItemsCount = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <div className="pt-20 relative">
      <div className="pl-6 mb-4 sm:pl-6">
        <h1 className="text-7xl sm:text-6xl md:text-4xl lg:text-5xl lg:ml-32 lg:mb-7 font-bold text-Rose-900">
          Desserts
        </h1>
      </div>
      <div className="flex flex-col px-3 gap-12 md:flex-row place-content-center lg:px-36 sm:px-6">
        <div className="max-w-800 w-full grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {data.map((item) => {
            const cartItem = cartItems.find((ci) => ci.id === item.id);
            return (
              <Product
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                image={item.image.desktop}
                category={item.category}
                initialCount={cartItem ? cartItem.quantity : 0}
                onIncrement={() => handleIncrement(item.id)}
                onDecrement={() => handleDecrement(item.id)}
              />
            );
          })}
        </div>
        <div
          className={`max-w-400 h-[300px] md:w-[70%] sm:w-[100%] bg-Rose-200 rounded-xl relative transition-all duration-300 ease-in-out ${
            totalItemsCount > 0 ? "bg-Rose-200" : "max-h-96"
          } ${totalItemsCount === 0 ? "bg-white" : "bg-Rose-200"}`}
        >
          <div>
            <h3 className="text-3xl font-extrabold p-5 text-Red">
              Your Cart ({totalItemsCount})
            </h3>
            <img
              src="./assets/images/illustration-empty-cart.svg"
              alt="Empty cart"
              className={`absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 ${
                totalItemsCount === 0 ? "flex" : "hidden"
              }`}
            />
          </div>
          <div
            className={`${
              totalItemsCount > 0 ? "block" : "hidden"
            } bg-Rose-300 w-full rounded-md p-7`}
          >
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="p-5 mb-2 rounded-md flex items-center justify-between text-Rose-900"
              >
                <div>
                  <h1 className="text-lg font-semibold">{item.name}</h1>
                  <div className="flex gap-2">
                    <p className="text-Red text-[17px] font-semibold">x{item.quantity}</p>
                    <p>@${item.price}</p>
                    <p className="text-Rose-500">Total: ${item.price * item.quantity}</p>
                  </div>
                </div>
                <div>
                  <img
                    src="./assets/images/icon-remove-item.svg"
                    alt="Remove item"
                    className="cursor-pointer bg-Rose-100 hover:bg-white rounded-full p-1"
                    onClick={() => handleDecrement(item.id)}
                  />
                </div>
              </div>
            ))}
            <div>
              <hr />
            </div>
            <hr className="text-red-800 w-[100%]" />
            <div className="flex items-center justify-between">
              <h1>Total</h1>
              <strong>
                $
                {cartItems.reduce(
                  (acc, item) => acc + item.price * item.quantity,
                  0
                )}
              </strong>
            </div>
            <div className="bg-Rose-100 w-[90%] h-10 mt-4 flex justify-evenly items-center rounded-md p-3">
              <img
                src="./assets/images/icon-carbon-neutral.svg"
                alt="Carbon neutral"
              />
              <p>
                This is <strong>carbon neutral</strong> delivery
              </p>
            </div>
            <button
              className="w-[90%] mt-4 bg-Red p-4 rounded-[100vmax] text-white font-bold"
              onClick={handleConfirmOrder}
            >
              Confirm Order
            </button>
          </div>
        </div>
      </div>
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <Confirmation pro={cartItems} onNewOrder={handleNewOrder} />
        </div>
      )}
    </div>
  );
}

export default Desserts;
