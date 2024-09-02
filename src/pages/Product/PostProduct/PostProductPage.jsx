import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useProduct } from '../../../features/Product/PostProduct/hooks/productHook';
import { ImageDropZone } from '../../../shared/ImageDropZone';
import axios from 'axios';

export default function PostProductPage() {
  const { setProduct } = useProduct();
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
      // redux 전역 상태 셋팅이라 무관함
      setProduct.setImages(data.images);
      setProduct.setProductName(data.productName);
      setProduct.setCategory(data.category);
      setProduct.setDescription(data.description);
      setProduct.setTags(data.tags);
      setProduct.setPrice(data.price);
      setProduct.setPriceOffer(data.priceOffer);
      // 상품 등록 액션 호출
      setProduct.postProduct();

      console.log('postproductData', data); // 제출된 데이터 확인용

      // const res = await axios.post('http://localhost:8000/postproduct', {
      //   productName: data,
      //   category: '',
      //   description: '',
      //   tags: '',
      //   price: '',
      //   priceOffer: '',
      // });
    } catch (error) {}
  };

  return (
    <main>
      <div className="max-w-5xl mx-auto p-6 ">
        <h1 className="text-center text-xl font-bold">판매글 작성페이지</h1>
        <form
          className="bg-white p-4 rounded"
          onSubmit={handleSubmit(postProduct)}
        >
          <ImageDropZone images={images} setImages={setImages} />
          <div className="mb-4">
            <label className="block text-gray-700">상품명</label>
            <input
              type="text"
              className="border border-gray-300 rounded w-full p-2"
              {...register('productName', { required: '제품명은 필수입니다.' })}
              id="productName"
              name="productName"
              placeholder="제품명을 입력해주세요"
            />
            {errors.productName && (
              <p className="text-red-500">{errors.productName.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">카테고리</label>
            <select
              className="border border-gray-300 rounded w-full p-2"
              {...register('category', { required: '카테고리는 필수입니다.' })}
            >
              <option value="">선택하세요</option>
              <option value="여성 의류">여성 의류</option>
              <option value="아우터">아우터</option>
              <option value="패딩">패딩</option>
            </select>
            {errors.category && (
              <p className="text-red-500">{errors.category.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">상품 설명</label>
            <textarea
              className="border border-gray-300 rounded w-full p-2 h-32"
              {...register('description', {
                required: '상품 설명은 필수입니다.',
              })}
            ></textarea>
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">태그</label>
            <input
              type="text"
              className="border border-gray-300 rounded w-full p-2"
              {...register('tags', { required: '태그는 필수입니다.' })}
            />
            {errors.pritagsce && (
              <p className="text-red-500">{errors.tags.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">가격</label>
            <input
              type="text"
              className="border border-gray-300 rounded w-full p-2"
              {...register('price', { required: '가격은 필수입니다.' })}
            />
            {errors.price && (
              <p className="text-red-500">{errors.price.message}</p>
            )}
            <input
              type="checkbox"
              {...register('priceOffer')}
              className="mr-2"
            />
            <span className="text-gray-500">가격 제안 받기</span>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              className="bg-gray-300 text-white p-2 rounded"
            >
              임시 저장
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              등록하기
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
