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
    <div>
      <div className="flex flex-wrap gap-10 px-7 py-8 mt-5 text-3xl text-black bg-zinc-300 max-md:px-5">
        <div
          onClick={() => handleScrollTo(newProductPriceRef)}
          className="cursor-pointer"
        >
          새상품 최저가
        </div>
        <div
          onClick={() => handleScrollTo(newProductReviewRef)}
          className="cursor-pointer"
        >
          새상품 리뷰
        </div>
        <div
          onClick={() => handleScrollTo(userReviewRef)}
          className="cursor-pointer"
        >
          거래후기
        </div>
      </div>

      <div ref={newProductPriceRef} className="py-8 mt-10">
        <h2 className="text-2xl">새상품 최저가</h2>
        {/* 새상품 최저가 내용 */}
        <p>여기에 새상품 최저가 내용이 들어갑니다.</p>
      </div>

      <div ref={newProductReviewRef} className="py-8 mt-10">
        <h2 className="text-2xl">새상품 리뷰</h2>
        {/* 리뷰 내용 */}
        <p>여기에 새상품 리뷰 내용이 들어갑니다.</p>
      </div>

      <div ref={userReviewRef} className="py-8 mt-10">
        <h2 className="text-2xl">거래후기</h2>
        {/* 거래 후기 내용 */}
        <p>여기에 거래 후기 내용이 들어갑니다.</p>

        {/* 댓글 작성 폼 */}
        <PostComment />

        {/* 댓글 내역 */}
        {/* <CommentSection /> */}
      </div>
    </div>
  );
};

export default ProductTab;
