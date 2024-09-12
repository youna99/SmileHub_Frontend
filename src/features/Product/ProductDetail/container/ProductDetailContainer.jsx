import React from 'react';
import ProductDetailPage from '../../../../pages/Product/ProductDetail/ProductDetailPage';

export default function ProductDetailContainer() {
  return (
    <main>
      <div className="max-w-5xl mx-auto p-6 ">
        <h1 className="text-center text-xl font-bold">상품 상세 페이지</h1>
        <ProductDetailPage />
      </div>
    </main>
  );
}
