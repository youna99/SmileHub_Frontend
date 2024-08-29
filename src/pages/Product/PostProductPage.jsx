import React from 'react';

export default function PostProductPage() {
  return (
    <main>
      <div className="max-w-2xl mx-auto p-6 ">
        <h1 className="text-center text-xl font-bold">판매글 작성페이지</h1>
        <form className="bg-white p-4 rounded ">
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
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">카테고리</label>
            <select className="border border-gray-300 rounded w-full p-2">
              <option>여성 의류</option>
              <option>아우터</option>
              <option>패딩</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">상품 설명</label>
            <textarea className="border border-gray-300 rounded w-full p-2 h-32"></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">태그</label>
            <input
              type="text"
              className="border border-gray-300 rounded w-full p-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">가격</label>
            <input
              type="text"
              className="border border-gray-300 rounded w-full p-2"
            />
            <span className="text-gray-500">가격 제안 받기</span>
          </div>

          <div className="flex justify-between">
            <button className="bg-gray-300 text-white p-2 rounded">
              임시 저장
            </button>
            <button className="bg-blue-500 text-white p-2 rounded">
              등록 하기
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
