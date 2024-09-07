import { useEffect, useState } from 'react';
import io from 'socket.io-client';

// WebSocket용 custom hook
const useSocket = (roomId) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // 서버에 WebSocket 연결
    const newSocket = io('http://localhost:8000', {
      query: { roomId },
    });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect(); // 컴포넌트 언마운트 시 소켓 연결 해제
    };
  }, [roomId]);

  // 메시지 전송
  const sendMessage = (message) => {
    if (socket) {
      socket.emit('message', message); // 서버로 메시지 전송
    }
  };

  // 메시지 수신
  const receiveMessage = (callback) => {
    if (socket) {
      socket.on('message', (message) => {
        callback(message); // 서버로부터 수신한 메시지
      });
    }
  };

  return { socket, sendMessage, receiveMessage };
};

export default useSocket;
