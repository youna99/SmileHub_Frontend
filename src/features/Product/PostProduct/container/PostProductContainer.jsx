// PostProductContainer.jsx
import ProductPage from '../../../../pages/Product/PostProduct/PostProductPage';

export default function PostProductContainer() {
  return (
    <main>
      <div className="max-w-5xl mx-auto p-6 ">
        <h1 className="text-center text-xl font-bold">판매글 작성페이지</h1>
        <ProductPage />
      </div>
    </main>
  );
}
