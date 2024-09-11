import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [imageFiles, setImageFiles] = useState([]);
  const [price, setPrice] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleFileChange = (event) => {
    setImageFiles(event.target.files); // 선택된 파일 목록
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // 기본 제출 이벤트 방지

    // FormData 객체 생성
    const formData = new FormData();
    formData.append('productName', title);
    formData.append('content', description);
    formData.append('price', price);
    formData.append('categoryId', 3); //카테고리아이디

    // 선택된 모든 파일을 FormData에 추가
    Array.from(imageFiles).forEach((file, index) => {
      console.log('formData >> ', index, file);
      formData.append(`productImg`, file);
    });

    try {
      const token = localStorage.getItem('token');
      console.log('token >> ', token);
      const response = await axios.post(
        'http://localhost:8000/product/write',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: token,
          },
        },
      );

      console.log('응답 >>>>> ', response.data);
      alert('상품이 성공적으로 추가되었습니다.');
    } catch (error) {
      console.error('상품 추가 중 오류 발생:', error);
      alert('상품 추가에 실패했습니다.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            파일:
            <input
              type="file"
              id="productImg"
              name="productImg"
              multiple
              onChange={handleFileChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            제목:
            <input
              type="text"
              className="border border-gray-300 rounded w-full p-2"
              id="productName"
              name="productName"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            내용:
            <textarea
              className="border border-gray-300 rounded w-full p-2 h-32"
              id="content"
              name="content"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            가격:
            <input
              type="number"
              className="border border-gray-300 rounded w-full p-2"
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          상품 추가
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
