import type { NextPage } from 'next';
import { useMachine } from '@xstate/react';
import { myFirsMachine } from './machine/myFirstMachine';
const Home: NextPage = () => {
  const [state, send] = useMachine(myFirsMachine);
  const { value } = state;
  return (
    <div>
      <h1>Learn XState</h1>
      <p>Todo app</p>

      <div>
        <h2>{`Lagi ${value}`}</h2>
        <button onClick={() => send('BERSANTAI')}>Santai</button>
        <button onClick={() => send('BEKERJA')}>Kerja</button>
      </div>
    </div>
  );
};

export default Home;
