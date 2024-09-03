import React from 'react';
import { Avatar } from 'flowbite-react';

const UserProductsList = ({ product, buttons }) => {
  return (
    <section className="border-b border-gray-200">
      <div className="flex items-center p-4">
        <Avatar
          img={product.img}
          size="lg"
          className="flex items-center justify-center rounded-lg"
        />
        <div className="ml-4 flex-1">
          <h2 className="text-lg">{product.productName}</h2>
          <p className="text-gray-400 text-sm">{product.address}</p>
          <p className="text-xl font-bold text-gray-800 mt-1">
            {product.price}원
          </p>
        </div>
        <p>{product.status}</p>
      </div>
      <div className="flex justify-end mb-2">{buttons}</div>
    </section>
  );
};

export default UserProductsList;
