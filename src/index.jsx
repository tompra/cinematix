import './index.scss';
import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view';
import { Container } from 'react-bootstrap';

const App = () => {
    return (
        <Container
            fluid
            style={{ minHeight: '100vh' }}
            className='d-flex flex-column p-0'
        >
            <MainView />
        </Container>
    );
};

const container = document.querySelector('#root');
const root = createRoot(container);

root.render(<App />);
