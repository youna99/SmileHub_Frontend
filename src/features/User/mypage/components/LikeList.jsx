import React from 'react';
import { Avatar } from 'flowbite-react';

const LikeList = () => {
  const products = [
    {
      imgSrc: 'your-image-url-1',
      title: '상품1',
      price: '50,000',
      location: '주소',
      isSoldOut: true,
    },
    {
      imgSrc: 'your-image-url-2',
      title: '상품2',
      price: '30,000',
      location: '주소',
      isSoldOut: false,
    },
    {
      imgSrc: 'your-image-url-3',
      title: '상품3',
      price: '20,000',
      location: '주소',
      isSoldOut: false,
    },
    {
      imgSrc: 'your-image-url-3',
      title: '상품3',
      price: '20,000',
      location: '주소',
      isSoldOut: true,
    },
  ];

  return (
    <section className="flex flex-wrap">
      {products.map((product, index) => (
        <div key={index} className="p-2 w-full sm:w-1/2">
          <div className="relative flex items-center bg-white p-4 rounded-lg border border-gray-200">
            <img
              src="/images/likeY.png"
              alt="Like"
              className="absolute top-2 right-2 w-6 h-6"
            />
            <Avatar
              img={product.imgSrc}
              size="lg"
              className="flex items-center justify-center rounded-lg"
            />
            {product.isSoldOut && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                <span className="text-white text-xl font-bold">판매완료</span>
              </div>
            )}
            <div className="ml-4 flex-1">
              <h2 className="text-lg">{product.title}</h2>
              <p className="text-gray-400 text-sm">{product.location}</p>
              <p className="text-xl font-bold text-gray-800 mt-1">
                {product.price}원
              </p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default LikeList;
