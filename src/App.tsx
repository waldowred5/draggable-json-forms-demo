import './App.css';
import { Header } from './components/Header';
import { JsonFormsDemo } from './components/JsonFormsDemo';

const App = () => {
  return (
    <div className={'flex w-screen h-screen'}>
      <div className={'flex flex-col flex-grow h-full'}>
        <Header />
        <JsonFormsDemo />
      </div>
    </div>
  );
};

export default App;
