import React, { useRef } from 'react';
import PostComment from './PostComment';

const ProductTab = () => {
  const newProductPriceRef = useRef(null); // 새상품 최저가
  const newProductReviewRef = useRef(null); // 거래후기
  const userReviewRef = useRef(null); // 새상품 리뷰

  const handleScrollTo = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-evenly flex-wrap gap-5 sm:gap-10 px-5 sm:px-7 py-4 sm:py-8 mt-5 text-xl font-semibold sm:text-2xl text-black bg-zinc-100 rounded-lg">
        <div
          onClick={() => handleScrollTo(newProductPriceRef)}
          className="cursor-pointer hover:text-[#f3b105] transition duration-300"
        >
          새상품 최저가
        </div>
        <div
          onClick={() => handleScrollTo(userReviewRef)}
          className="cursor-pointer hover:text-[#f3b105] transition duration-300"
        >
          거래후기
        </div>
      </div>

      <div ref={newProductPriceRef} className="py-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          새상품 최저가
        </h2>
        <p className="mt-2 text-gray-600">
          여기에 새상품 최저가 내용이 들어갑니다.
        </p>
        <hr className="mt-2" />
      </div>
      <div ref={userReviewRef} className="py-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          거래후기
        </h2>
        <p className="mt-2 text-gray-600">
          여기에 거래 후기 내용이 들어갑니다.
        </p>
        <hr className="mt-2" />

        {/* 댓글 작성 폼 */}
        <PostComment />

        {/* 댓글 내역 */}
        {/* <CommentSection /> */}
      </div>
    </div>
  );
};

export default ProductTab;
