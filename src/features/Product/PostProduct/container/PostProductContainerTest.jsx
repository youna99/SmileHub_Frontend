// PostProductContainer.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
// import { useProduct } from '../hooks/productHook';
import ProductPageTest from '../../../../pages/Product/PostProduct/PostProductPageTest';
import axios from 'axios';

export default function PostProductContainer() {
  // const { setProduct } = useProduct();
  const [images, setImages] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      productName: '',
      category: '',
      description: '',
      tags: '',
      price: '',
      priceOffer: false,
    },
  });

  const postProduct = async (data) => {
    try {
      // setProduct.setImages(images); // images를 사용해야 함
      // setProduct.setProductName(data.productName);
      // setProduct.setCategory(data.category);
      // setProduct.setDescription(data.description);
      // setProduct.setTags(data.tags);
      // setProduct.setPrice(data.price);
      // setProduct.setPriceOffer(data.priceOffer);
      // // 상품 등록 액션 호출
      // setProduct.postProduct();

      // 서버에 데이터 전송
      const res = await axios.post('http://localhost:8000/product/write', {
        imgFileArr: data.images,
        productName: data.productName,
        userId: 2,
        categoryId: 1,
        content: data.description,
        price: data.price,
      });
      console.log('postProduct ->', res.data);
    } catch (error) {
      console.error('Error posting product:', error);
    }
  };

  return (
    <main>
      <div className="max-w-5xl mx-auto p-6 ">
        <h1 className="text-center text-xl font-bold">판매글 작성페이지</h1>
        <ProductPageTest
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          images={images}
          setImages={setImages}
          onSubmit={postProduct} // 프레젠테이셔널 컴포넌트에 제출 함수 전달
        />
      </div>
    </main>
  );
}
