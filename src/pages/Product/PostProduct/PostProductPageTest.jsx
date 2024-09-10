// PostProductPage.jsx

// const PostProductPage = ({
//   register,
//   handleSubmit,
//   errors,
//   images,
//   setImages,
//   onSubmit,
// }) => {
//   return (

import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { TestImageDropZone } from '../../../shared/TestImageDropZone';

export default function PostProduct() {
  const [imageFiles, setImageFiles] = useState([]);

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

  // 이미지 파일 설정 함수 (자식 컴포넌트로 전달)
  // 여기서 newFiles는 자식 컴포넌트에서 전달하는 newImageFiles
  // 즉, 추가된 이미지 파일들
  // setImageFiles로 기존 파일들에 새로운 이미지 파일들을 스프레드 연산자로 추가 한 후,
  // ImageFiles 상태 업데이트
  // const handleSetImageFiles = useCallback((newFiles) => {
  //   setImageFiles((prevFiles) => [...prevFiles, ...newFiles]);
  // }, []);

  const handleImageChange = (e) => {
    setImageFiles(e.target.files);
  };

  const postProduct = async (data) => {
    // setImageFiles(data); /// 지우고
    try {
      const token = localStorage.getItem('token'); // 토큰 가져오기
      // FormData 객체 생성 - 파일 전송
      const formData = new FormData();

      // 이미지 파일들을 FormData에 추가

      // 폼의 텍스트 데이터를 FormData에 추가
      formData.append('productName', data.productName);
      formData.append('categoryId', 3); // 카테고리도 폼에서 받아오는 경우
      formData.append('userId', 3); // userId도 폼에서 받아오는 경우
      formData.append('content', data.description);
      formData.append('price', data.price);

      Array.from(imageFiles).forEach((file, i) => {
        console.log(`>>> ${i}`);

        formData.append(`productImg${i}`, file);
      });

      for (let key of formData.keys()) {
        console.log(key, '>>>>', formData.get(key));
      }
      const res = await axios.post(
        'http://localhost:8000/product/write',
        formData,
        {
          // Content-type 명시적으로 설정.
          headers: {
            Authorization: token,
          },
        },
      );

      console.log('응답 >>>>> ', res);
      console.log('응답 Data >>>>> ', res.data);
    } catch (error) {
      console.error('Error posting product:', error);
    }
  };

  return (
    <main>
      <div className="max-w-5xl mx-auto p-6 ">
        <h1 className="text-center text-xl font-bold">판매글 작성페이지</h1>
        <form
          className="bg-white p-4 rounded"
          onSubmit={handleSubmit(postProduct)}
          encType="multipart/form-data"
        >
          <input
            type="file"
            name="productImg1"
            accept="image/*"
            onChange={handleImageChange}
            required
            multiple
          />
          {/* <TestImageDropZone
            // 바꾼 이름으로 다시 Props!
            handleSetImageFiles={handleSetImageFiles}
          /> */}
          {/* <input type="file" name="" id="" /> */}
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
            {errors.tags && (
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
