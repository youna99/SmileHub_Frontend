import React from 'react';
import { useForm } from 'react-hook-form';
import { useProduct } from '../../../features/Product/PostProduct/hooks/productHook';

export default function PostProductPage() {
  const { setProduct } = useProduct();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      productName: '',
      category: '',
      description: '',
      tags: '',
      price: '',
    },
  });

  const [productName, category, description, tags, price] = watch([
    'productName',
    'category',
    'description',
    'tags',
    'price',
  ]);

  const postProductSubmit = (data) => {
    setProduct.setProductName(data.productName);
    setProduct.setCategory(data.category);
    setProduct.setDescription(data.description);
    setProduct.setTags(data.tags);
    setProduct.setPrice(data.price);
    // 이미지 처리 추가 필요
    // 예: setProduct.setImages(data.images);
    // 상품 등록 액션 호출
    setProduct.postProduct();
    console.log(data); // 제출된 데이터 확인용
  };

  return (
    <main>
      <div className="max-w-5xl mx-auto p-6 ">
        <h1 className="text-center text-xl font-bold">판매글 작성페이지</h1>
        <form
          className="bg-white p-4 rounded"
          onSubmit={handleSubmit(postProductSubmit)}
        >
          <div className="mb-4">
            <label className="block text-gray-700">상품 이미지 / 총 10장</label>
            <div className="h-32 bg-gray-200 flex items-center justify-center">
              이미지 등록
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">상품명</label>
            <input
              type="text"
              className="border border-gray-300 rounded w-full p-2"
              {...register('productName', { required: '제품명은 필수입니다.' })}
              id="productName"
              name="productName"
              // type=""
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
            {errors.price && (
              <p className="text-red-500">{errors.price.message}</p>
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
