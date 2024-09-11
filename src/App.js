import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { RootRouter } from './app/rootRouter';

const App = () => {
  return (
    <BrowserRouter>
      <RootRouter />
    </BrowserRouter>
  );
};

export default App;
