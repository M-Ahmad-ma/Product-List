import React from "react";

function Confirmation({ pro, onNewOrder }) {
  return (
    <div className="relative bg-white p-[2rem] rounded-xl shadow-lg z-10 w-[500px]">
      <img
        src="./assets/images/icon-order-confirmed.svg"
        alt="Order confirmed"
        className="w-12 h-12 mb-4 mx-auto ml-0"
      />
      <h1 className="text-2xl font-bold text-left mb-2">Order Confirmed</h1>
      <p className="text-left text-gray-700 mb-4">
        We hope you enjoy your food!
      </p>
      <div className="w-full bg-Rose-100 p-4 rounded-lg mb-4">
        {pro.map((product) => {
          const imagePath = product.image.thumbnail; 
          return (
            <div
              key={product.id}
              className="flex items-center justify-between mb-2"
            >
              <div className="flex items-center">
                <img
                  src={imagePath}
                  alt={product.name}
                  className="w-12 h-12 rounded mr-4"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "./assets/images/image-baklava-thumbnail.jpg"; 
                  }}
                />
                <div>
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p className="text-gray-600">
                    {product.quantity} x ${product.price.toFixed(2)}
                  </p>
                </div>
              </div>

              <p className="font-bold">
                ${(product.price * product.quantity).toFixed(2)}
              </p>
            </div>
          );
        })}
        <hr className="my-2" />
        <div className="flex justify-between items-center font-bold">
          <span>Total</span>
          <span>
            $
            {pro.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
          </span>
        </div>
      </div>
      <button
        className="bg-Red text-white w-full py-2 rounded-full font-bold"
        onClick={onNewOrder}
      >
        Start New Order
      </button>
    </div>
  );
}

export default Confirmation;
