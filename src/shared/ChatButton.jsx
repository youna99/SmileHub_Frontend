import React from 'react';

const ChatButton = () => {
  const openChatPage = () => {
    // 현재 화면의 크기 계산
    const width = 1000;
    const height = 600;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    // 새 창 가운데 정렬
    window.open(
      '/chat',
      '_blank',
      `width=${width},height=${height},left=${left},top=${top}`,
    );
  };

  return (
    <button
      onClick={openChatPage}
      className="fixed bottom-16 right-16 bg-blue-500 text-white px-8 py-3 rounded-full shadow-lg text-lg tracking-widest hover:bg-blue-600"
    >
      Chat
    </button>
  );
};

export default ChatButton;
