import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { RootRouter } from './app/rootRouter';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <RootRouter />
            </BrowserRouter>
        </div>
    );
}

export default App;
