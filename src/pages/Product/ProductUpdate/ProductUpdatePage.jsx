import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../../App.css';

const EditProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const productId = new URLSearchParams(location.search).get('productId'); // URL에서 productId 가져오기
  // console.log('productId > ', productId);
  const [product, setProduct] = useState({
    productName: '',
    content: '',
    price: '',
  });
  const [loading, setLoading] = useState(true);
  const [imageFiles, setImageFiles] = useState([]); // 이미지 파일 상태 추가

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/product/read?productId=${productId}`,
        );
        setProduct(response.data);
      } catch (error) {
        console.error('상품 데이터를 가져오는 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setImageFiles(e.target.files); // 선택된 파일 목록을 상태에 저장
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setImageFiles(files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // 기본 동작 방지
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 상품 정보 추가
    const formData = new FormData();
    formData.append('productName', product.productName);
    formData.append('price', product.price);
    formData.append('content', product.content);

    // 이미지 파일 추가
    Array.from(imageFiles).forEach((file, index) => {
      console.log('formData >> ', index, file);
      formData.append('productImg', file);
    });

    formData.forEach((value, key) => {
      console.log(key, value); // 키와 값을 출력
    });

    // 수정된 상품 정보를 서버로 전송
    try {
      const token = localStorage.getItem('token');
      console.log('token >> ', token);
      const response = await axios.post(
        `http://localhost:8000/product/updated?productId=${productId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: token,
          },
        },
      );
      console.log('응답 >>>>> ', response.data);
      alert('상품이 성공적으로 수정되었습니다.');
      navigate(`/product/read?productId=${productId}`); // 수정 후 상세 페이지로 이동
    } catch (error) {
      console.error('상품 추가 중 오류 발생:', error);
      alert('상품 수정에 실패했습니다.');
    }
  };
  // .catch((error) => {
  //   // console.log('>>> ', res.message, res.status);
  //   console.error('상품 수정 중 오류 발생:', error.status);
  //   if (error.status === 400) {
  //     alert('로그인 유저와 작성자가 일치하지 않습니다.');
  //   }
  // });
  // if (loading) {
  //   return <div>로딩 중...</div>;
  // }

  return (
    <div>
      <h1>상품 수정 페이지</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg w-full max-w-3xl space-y-4"
      >
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            파일
            <input
              type="file"
              id="productImg"
              name="productImg"
              multiple
              onChange={handleFileChange}
              required
              className="mt-1 block w-full text-gray-800 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black p-2"
            />
          </label>
        </div>
        <div>
          <label>
            상품 이름:
            <input
              type="text"
              className="product-name"
              name="productName"
              value={product.productName}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            내용:
            <textarea
              className="product-content"
              name="content"
              value={product.content}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            가격:
            <input
              type="number"
              className="product-price"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        {/* <div
          className="drop-area"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="upload-icon"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <p>여기서 파일을 드래그하거나 클릭하여 업로드하세요.</p>
        </div> */}
        <button
          className=" bg-[#FEE715] text-black p-2 rounded hover:bg-black hover:text-[#FEE715] focus:outline-none focus:ring-2 focus:ring-[#FEE715]"
          type="submit"
        >
          상품 수정
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
