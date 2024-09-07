import React from 'react';

export default function PostComment() {
  return (
    <>
      <span class="font-semibold mr-2 text-lg">댓글</span>
      <form id="commentForm" name="comment" class="space-y-4 mt-4">
        <textarea
          id="comment"
          name="text"
          placeholder=".(100자 이하)"
          maxlength="100"
          class="w-full h-24 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        ></textarea>
        <div class="flex justify-end">
          <button
            type="submit"
            class="bg-blue-500 text-white font-semibold py-1 p-1 md:py-1 md:px-3 rounded hover:bg-blue-600"
          >
            댓글 작성
          </button>
        </div>
      </form>
    </>
  );
}
