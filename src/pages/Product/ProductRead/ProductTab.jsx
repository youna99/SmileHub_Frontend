import React, { useRef } from 'react';
import PostComment from './PostComment';

const ProductTab = (newItem) => {
  const newProductPriceRef = useRef(null); // 새상품 최저가
  // const newProductReviewRef = useRef(null); // 거래후기
  const userReviewRef = useRef(null); // 새상품 리뷰

  const handleScrollTo = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  console.log('newItem >> ', newItem.newItem.length);

  return (
    <div className="container mx-auto">
      <hr />
      <div
        className="flex justify-evenly flex-wrap gap-5 sm:gap-10 px-5 sm:px-7 py-4 sm:py-8 mt-5 cursor-pointer text-xl font-semibold sm:text-2xl text-black "
        onClick={() => handleScrollTo(newProductPriceRef)}
      >
        <div>새상품 최저가</div>
        {/* <div
          onClick={() => handleScrollTo(userReviewRef)}
          className="cursor-pointer hover:text-[#f3b105] transition duration-300"
        >
          거래후기
        </div> */}
      </div>
      <div ref={newProductPriceRef} className="py-8">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="text-center p-2 text-gray-600 font-semibold w-1/4">
                  판매처
                </th>
                <th className="text-center p-2 text-gray-600 font-semibold w-1/4">
                  상품명
                </th>
                <th className="text-center p-2 text-gray-600 font-semibold w-1/4">
                  가격
                </th>
                <th className="text-center p-2 text-gray-600 font-semibold w-1/4">
                  링크
                </th>
              </tr>
            </thead>
            <tbody>
              {newItem.newItem && newItem.newItem.length > 0 ? (
                newItem.newItem.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-4 text-gray-800 w-1/4">
                      {item.mallName}
                      {item.npay ? (
                        <span className="ml-2 bg-green-500 text-white px-2 py-1 text-xs rounded-full">
                          Npay
                        </span>
                      ) : null}
                    </td>
                    <td className="p-4 text-gray-800 w-1/4">
                      <span className="font-semibold block sm:whitespace-normal sm:overflow-visible whitespace-nowrap overflow-hidden text-ellipsis max-w-[10ch] sm:max-w-[15ch]">
                        {item.title
                          .split('<b>')
                          .join('')
                          .split('</b>')
                          .join('')
                          .split('&amp;')
                          .join('')
                          .split('&quot')
                          .join('')}
                      </span>
                    </td>
                    <td className="p-4 text-gray-900 w-1/4 text-center">
                      {item.lprice} 원
                    </td>
                    <td className="p-4 w-1/4">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 font-semibold"
                      >
                        사러가기
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-4 text-gray-500">
                    새 상품에 대한 정보가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* <hr className="mt-2" /> */}
      {/* <div ref={userReviewRef} className="py-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          거래후기
        </h2>
        <p className="mt-2 text-gray-600">
          여기에 거래 후기 내용이 들어갑니다.
        </p>
        <hr className="mt-2" /> */}
      {/* 댓글 작성 폼 */}
      {/* <PostComment /> */}
      {/* 댓글 내역 */}
      {/* <CommentSection /> */}
      {/* </div> */}
    </div>
  );
};

export default ProductTab;
