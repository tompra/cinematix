import './index.scss';
import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view';

const App = () => {
    return (
        <div className='gradient-custom main-container'>
            <MainView />
        </div>
    );
};

const container = document.querySelector('#root');
const root = createRoot(container);

root.render(<App />);
