import React, { useState } from 'react';

const CommentElement = ({
  comment,
  sessionUser,
  onEditComment,
  onDeleteComment,
  onSubmitReply,
}) => {
  const [isReplyFormVisible, setIsReplyFormVisible] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const handleReplySubmit = (e) => {
    e.preventDefault();
    onSubmitReply(comment.comId, replyContent);
    setReplyContent('');
    setIsReplyFormVisible(false);
  };

  return (
    <li className="list-none mb-4">
      <div
        className="bg-white rounded-lg shadow-md p-4 mb-4 mt-8"
        data-comment-id={comment.comId}
      >
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <p className="text-gray-700 font-semibold mr-2">
              {comment.User.userNick}
            </p>
            <p className="text-gray-600 text-sm">
              {new Date(comment.createdAt).toLocaleDateString()}
            </p>
          </div>
          {sessionUser && sessionUser.userId === comment.userId && (
            <div>
              <button
                onClick={() => onEditComment(comment.comId)}
                className="bg-gray-500 text-white font-semibold py-0.5 px-1 text-xs md:py-1 md:px-3 rounded mr-0.5 md:mr-2 hover:bg-green-400"
              >
                수정
              </button>
              <button
                onClick={() => onDeleteComment(comment.comId)}
                className="bg-gray-500 text-white font-semibold py-0.5 px-1 text-xs md:py-1 md:px-3 rounded hover:bg-red-600"
              >
                삭제
              </button>
            </div>
          )}
        </div>
        <p className="text-gray-600 pb-1">{comment.comContent}</p>
        <button
          type="button"
          className="bg-gray-200 py-0.5 px-1 text-xs md:py-1 md:px-3 rounded"
          onClick={() => setIsReplyFormVisible((prev) => !prev)}
        >
          답글
        </button>
        {isReplyFormVisible && (
          <form className="mt-2" onSubmit={handleReplySubmit}>
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="w-full p-2 border rounded mb-2"
              placeholder="대댓글 입력"
              required
            />
            <button
              type="submit"
              className="bg-green-500 text-white font-semibold py-1 px-3 rounded hover:bg-green-600"
            >
              등록
            </button>
          </form>
        )}
        {comment.replies && comment.replies.length > 0 && (
          <ul>
            {comment.replies.map((reply) => (
              <li key={reply.comId}>
                <div
                  className="bg-gray-100 rounded-lg shadow-md p-4 ml-8 mb-4"
                  data-reply-id={reply.comId}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <p className="text-gray-700 font-semibold mr-2">
                        {reply.User ? reply.User.userNick : 'Unknown'}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {new Date(reply.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    {sessionUser && sessionUser.userId === reply.userId && (
                      <div>
                        <button
                          onClick={() => onEditComment(reply.comId)}
                          className="bg-gray-500 text-white font-semibold py-0.5 px-1 text-xs md:py-1 md:px-3 rounded mr-0.5 md:mr-2 hover:bg-green-400"
                        >
                          수정
                        </button>
                        <button
                          onClick={() => onDeleteComment(reply.comId)}
                          className="bg-gray-500 text-white font-semibold py-0.5 px-1 text-xs md:py-1 md:px-3 rounded hover:bg-red-600"
                        >
                          삭제
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 pb-1">{reply.comContent}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
};

const CommentSection = ({
  comments,
  sessionUser,
  onEditComment,
  onDeleteComment,
  onSubmitReply,
}) => {
  return (
    <ul id="comment-section">
      {comments.map((comment) => (
        <CommentElement
          key={comment.comId}
          comment={comment}
          sessionUser={sessionUser}
          onEditComment={onEditComment}
          onDeleteComment={onDeleteComment}
          onSubmitReply={onSubmitReply}
        />
      ))}
    </ul>
  );
};

export default CommentSection;
