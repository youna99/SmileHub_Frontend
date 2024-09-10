import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { RootRouter } from './app/rootRouter';
// import Header from './shared/Header';
// import ChatButton from './shared/ChatButton';

// ChatPage에서 헤더와 버튼 표시 안함
// 라우터 내부에서 useLocation을 사용하기 위해 분리 => useLocation은 <BrowserRouter> 내부에서만 사용될 수 있기 때문
// const AppLayout = () => {
//   // const location = useLocation();
//   // const isChatPage = location.pathname === '/chat';

//   return (
//     <div className="App">
//       {!isChatPage && <Header />}
//       <RootRouter />
//       {/* {!isChatPage && <ChatButton />} */}
//     </div>
//   );
// };

const App = () => {
  return (
    <BrowserRouter>
      {/* <AppLayout /> */}
      <RootRouter />
    </BrowserRouter>
  );
};

export default App;
