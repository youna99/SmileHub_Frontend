// import axios from 'axios';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function SearchPage() {
  //   const [searchKeyword, setSearchKeyword] = useState('');
  //   const [searchType, setSearchType] = useState('name');
  //   const [productList, setProductList] = useState([]);

  const location = useLocation();
  const { results } = location.state || { results: [] };

  //   useEffect(() => {
  //     const getSearch = async () => {
  //       try {
  //         const res = await axios.get('http://localhost:8000/product/search', {
  //           searchKeyword: searchKeyword,
  //           searchType: searchType,
  //         });
  //         console.log('submitSearch res =>', res);
  //       } catch (error) {
  //         console.log('error', error);
  //       }
  //     };
  //     getSearch();
  //   }, []);

  //   const renderProduct = (productInfo) => (
  //     <div
  //       key={productInfo.productId}
  //       className="flexcard back w-full md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5  p-3"
  //     >
  //       <Link to={`/product/read?productId=${productInfo.productId}`}>
  //         <div
  //           className="flex  md:w-80w-full  flex-col bg-white border border-coolGray-100 shadow-dashboard rounded-md
  //           h-auto shadow-lg hover:shadow-xl overflow-hidden transform origin-bottom transition duration-400 ease-in
  //           min-w-60 relative"
  //         >
  //           <h2 className="tracking-tight text-gray-900 text-lg font-bold hover:underline block mb-2">
  //             {productInfo.productId}번
  //           </h2>
  //           <div className="flex flex-col justify-center items-start px-4 pt-4 pb-4">
  //             <h2 className="tracking-tight text-gray-900 text-lg font-bold hover:underline block mb-2">
  //               상품 이름 : {productInfo.productName}
  //             </h2>
  //             <h3 className="mt-2 text-sm text-gray-700 line-clamp-3">
  //               상품 내용 :{' '}
  //               {productInfo.content.length > 100
  //                 ? `${productInfo.content.slice(0, 100)}...`
  //                 : productInfo.content}
  //             </h3>
  //             <div className="border-t border-gray-300 pt-2 mt-2 w-full">
  //               <div className="items-center text-gray-400 text-xs mt-1">
  //                 <span className="font-medium text-gray-400 text-sm">
  //                   가격 : {productInfo.nickname}
  //                 </span>
  //                 <span className="font-medium text-gray-400 text-sm">
  //                   주소 : {productInfo.nickname}
  //                 </span>
  //                 <span className="font-medium text-gray-400 text-sm">
  //                   닉네임 : {productInfo.nickname}
  //                 </span>
  //                 <span>
  //                   날짜 :{new Date(productInfo.updatedAt).toLocaleDateString()}
  //                 </span>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </Link>
  //     </div>
  //   );
  return (
    <>
      <div className="flex flex-wrap min-h-screen m-5">
        {/* {loading && <p>Loading...</p>}
        {error && <p className="text-red-900">{error}</p>}
        {productList.map(renderProduct)} */}
        <h1>검색 결과</h1>
        {results.length === 0 ? (
          <p>검색 결과가 없습니다.</p>
        ) : (
          <ul>
            {results.map((item) => (
              <li key={item.productId}>{item.productName}</li> // 예시로 'id'와 'name' 사용
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
