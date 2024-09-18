import { FC } from 'react';

export const Header: FC = () => {
  return (
    <div className="flex w-full shadow-3xl text-center mb-0.5">
      <header className="flex flex-grow bg-slate-800 p-4 justify-between text-white items-center">
        <div>
          <img src="./logo.svg" className="App-logo" alt="logo" />
        </div>
        <div className="flex flex-col items-end">
          <h1 className="flex text-2xl font-semibold">Welcome to JSON Forms with React</h1>
          <p className="flex">More Forms. Less Code.</p>
        </div>
      </header>
    </div>
  );
};
