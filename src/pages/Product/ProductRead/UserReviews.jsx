// import React from 'react';
// const PostDetail = ({}) => {
//   const handleCommentSubmit = (e) => {
//     e.preventDefault();
//     const commentText = e.target.elements.text.value;
//     // 댓글 제출 로직 추가
//   };

//   return (
//     <main className="mx-auto px-4 sm:px-24 md:px-36 lg:px-80 pt-20">
//       <h1 id="postTitle" className="text-3xl font-extrabold mb-10 text-center">
//         {post.postTitle} {/* 게시글 제목 */}
//       </h1>
//       <div className="text-gray-500 mb-5">
//         <div className="flex justify-between items-center">
//           <div>
//             <span className="font-semibold mr-2">by {post.User.userNick}</span>
//             <span className="text-sm">
//               {new Date(post.createdAt).toLocaleDateString()} {/* 작성 날짜 */}
//             </span>
//           </div>
//           <div>
//             {sessionUser && sessionUser.userId === post.userId && (
//               <>
//                 <button
//                   type="button"
//                   className="bg-gray-500 text-white font-semibold py-0.5 px-1 text-xs md:text-sm md:py-1 md:px-3 rounded mr-0.5 md:mr-2 hover:bg-green-600"
//                   onClick={() => editPost(post.postId)}
//                 >
//                   수정
//                 </button>
//                 <button
//                   type="button"
//                   className="bg-gray-500 text-white font-semibold py-0.5 px-1 text-xs md:text-sm md:py-1 md:px-3 rounded hover:bg-red-600"
//                   onClick={() => deletePost(post.postId)}
//                 >
//                   삭제
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//         <hr className="border border-gray-300 my-2" />
//       </div>
//       <div className="mt-5 min-h-[50vh]">
//         <p id="postContent">{post.postContent}</p> {/* 게시글 내용 */}
//       </div>
//       <hr className="border border-gray-300 my-6" />
//       <span className="font-semibold mr-2 text-lg">댓글</span>
//       <form
//         id="commentForm"
//         name="comment"
//         className="space-y-4 mt-4"
//         onSubmit={handleCommentSubmit}
//       >
//         <textarea
//           id="comment"
//           name="text"
//           placeholder="댓글을 작성하세요.(100자 이하)"
//           maxLength="100"
//           className="w-full h-24 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
//         ></textarea>
//         <div className="flex justify-end">
//           <button
//             type="submit"
//             className="bg-blue-500 text-white font-semibold py-1 p-1 md:py-1 md:px-3 rounded hover:bg-blue-600"
//           >
//             댓글 작성
//           </button>
//         </div>
//       </form>
//       <div id="comment-section">{/* 댓글 섹션 */}</div>
//     </main>
//   );
// };

// export default PostDetail;
