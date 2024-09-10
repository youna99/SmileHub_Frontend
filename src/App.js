import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { RootRouter } from './app/rootRouter';

function App() {
  return (
    <BrowserRouter>
      <RootRouter />
    </BrowserRouter>
  );
}

export default App;
