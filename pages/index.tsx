import type { NextPage } from 'next';
import { useMachine } from '@xstate/react';
import { myFirsMachine } from './machine/myFirstMachine';
import { todoAppMachine } from './machine/todoAppMachine';

const todos = new Set<string>(['lagi masak', 'lagi main']);

const Home: NextPage = () => {
  const [state, send] = useMachine(todoAppMachine, {
    services: {
      loadTodos: async () => {
        return Array.from(todos);
      },
      addTodo: async (context, event) => {
        todos.add(context.newTodo);
      },
    },
  });

  return (
    <div>
      <h1>Learn XState</h1>
      <p>Todo app</p>

      <div>
        <h2>{JSON.stringify(state.value)}</h2>
        <pre>{JSON.stringify(state.context)}</pre>
        <div>
          {state.matches('todos loaded') && (
            <button
              onClick={() =>
                send({
                  type: 'Create New',
                })
              }
            >
              create new
            </button>
          )}
          {state.matches('create new todo.Showing Form Input') && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send({
                  type: 'Submit',
                });
              }}
            >
              <input
                type="text"
                onChange={(e) => {
                  send({
                    type: 'Form input Change',
                    value: e.target.value,
                  });
                }}
              />
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
