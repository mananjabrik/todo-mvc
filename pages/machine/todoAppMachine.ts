import { createMachine, assign } from 'xstate';

export const todoAppMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBcD2FUAIC2BDAxgBYCWAdmAHQA2quEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uZMVSkA2gAYAuolAAHWcRVq9IAB6IAbFYoB2AMwBGTQA4AnJ4CsDh+7vuADQgAJ6IALSeDhTumg52rgAsiQBMXv5uAL6ZwUI4BCScEvSkjEJsYABOlaiVFPpUygBmtdgUeSKF4rQlZTJyCkomGjpmhrDGqqRmlgjhyU4UNq6adl5xKe6+rnbBYXNWjhSJNu5WmlbOaSfZuTL5opzlmMWQrADClWDKYJgAcmAAO5jIzDGaITwUNwuBwpRJuTSadwpVx7CKHRIUByaJwOKxw-xOFZ2W4gDoFMQUfBfH6YciA6QYCgAZUIqEBUgAYq1MABJUj6ACuyFY3Mq2EwZCFyEw70IuFKYBBEzBSAsEScROOLlSWysXkSdkSPjRczxmgoSUNdicVncXlcKXiiVJ5MelGp32Qv3pjNQLLZHNKmDFEv50tYzMFACNsMZlZNTGrZprbNDcSk4V4vE4vCjTfN8UsUvjvJoUnFXFZXfdOpTPbTfUIKLBcNwpEJ2GpKAoBO1axTOA3vXSgX6W22OzJ5KReEMplpdGrxonpsnECk1pbYkb9atK8kC6WKAbkv59UT4k4axgHl0qTSR02ZBP28HO1UanUGs1Wv3b3WQ6Pj6Y7Nq2b59BgM5zsoC6jMuoJTOCCCpvY6QJC4qxEpqqKhBEzhpk4TpbLCVbONepKkOgcBmG697FFOLAJqqoCzPMObFrERE+Js2y7HhcyYbY8LxFaaQZCSORkgO7r-rILw9JAzFIeuCBGhQKKOFYqQOuceJWAWrguDE8JbAkNpnJmN7CIO3SSO+9yfrUylJqxETGtEmi6a4OweFYuYGQJ4Q5q4SzrNm-lOIk7jYdZd71sBo4Ms2rLslyPLhsKLlrm5glarqUXpA6uZ2F5BYnO4FC5rimoOnYaQOnFgEeolz5MuBjGoNlyFpLYOYlpoiR+Bc2ZOOVpUxOspUlpmCQok1tkPl6IHJTI3WqeEUUpMcmyFfaRleKVXgFga0TuMkQ34v5fi5gt7rrbl8x2HYULeb5ZwBQWLgBFi-heOchybraknZEAA */
  createMachine(
    {
      context: {
        todos: [] as string[],
        errorMessage: undefined as string | undefined,
        newTodo: '',
      },
      tsTypes: {} as import('./todoAppMachine.typegen').Typegen0,
      schema: {
        services: {} as {
          loadTodos: {
            data: string[];
          };
          addTodo: {
            data: void;
          };
        },
        events: {} as
          | {
              type: 'Create New';
            }
          | {
              type: 'Form input Change';
              value: string;
            }
          | {
              type: 'Submit';
            },
      },
      initial: 'loading todos',
      id: 'todo machine',
      states: {
        'loading todos': {
          invoke: {
            src: 'loadTodos',
            onDone: [
              {
                actions: 'assignTodoToContext',
                target: 'todos loaded',
              },
            ],
            onError: [
              {
                actions: 'assignErrorToContext',
                target: 'loading todo error',
              },
            ],
          },
        },
        'todos loaded': {
          on: {
            'Create New': {
              target: 'create new todo',
            },
          },
        },
        'loading todo error': {},
        'create new todo': {
          initial: 'Showing Form Input',
          states: {
            'Showing Form Input': {
              on: {
                'Form input Change': {
                  actions: 'assignFormInputToContext',
                },
                Submit: {
                  target: 'Saving todo',
                },
              },
            },
            'Saving todo': {
              invoke: {
                src: 'addTodo',
                onDone: [
                  {
                    target: '#todo machine.loading todos',
                  },
                ],
                onError: [
                  {
                    actions: 'assignErrorToContext',
                    target: 'Showing Form Input',
                  },
                ],
              },
            },
          },
        },
      },
    },
    {
      actions: {
        assignTodoToContext: assign((context, event) => {
          return {
            todos: event.data,
          };
        }),
        assignErrorToContext: assign((context, event) => {
          return {
            errorMessage: (event.data as Error).message,
          };
        }),
        assignFormInputToContext: assign((context, event) => {
          return {
            newTodo: event.value,
          };
        }),
      },
    }
  );
