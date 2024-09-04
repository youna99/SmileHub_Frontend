import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { RootRouter } from './app/rootRouter';
import Header from './shared/Header';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <RootRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
