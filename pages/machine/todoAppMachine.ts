import { createMachine, assign } from 'xstate';

export const todoAppMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBcD2FUAIC2BDAxgBYCWAdmAHQA2quEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uZMVSkA2gAYAuolAAHWcRVq9IAB6IAtAEYbAVgoAOACwBOAGwB2AMwuATD42ge4ANCAAntbBmpoULk7+bjY+-k4eTm72LgC+OeFCOAQknBL0pIxCbGAATjWoNRT6VMoAZg3YFIUiJeK05ZUycgpKJho6ZoawxqqkZpYIVh7+HvH2Hh4+XjYuXhvZ4VGLTl5uzjb7ycEuqT55BTJFopxVmGWQrADCNWDKYJgAOTAAHdJkYxvNrE4fPE3G5fDZNIiXAdIlCnHEnBj3Cl7E5EfZ-PcQN1imIukM3v0PgARMBUMDIMBg6YQpAWRDIiheBJuDHefEBfyHaJIuJw+yaHl+XHeYmk56UfA-P6YcjA6QYCgAZUIqGBUgAYh1MABJUj6ACuyFYxpq2EwZCtyEwn0IuAqzPZUxmpnZCysWxh9lSXnS9jcWxcyxFixDLniQS8Up8yU0W3s8sePXJyt+TLVIM1qB1eoNFUwdod5udrG1loARthjCzfXN-VCYR4soEvISeVk-LGlj5Vv4Uv5dq43JoXJonFmME9ehQ86r1cWdbhuFIhOw1JQFAIKUuc5w1wWN0ItzuK0J5KReKNZlpdN7wbNIYtEc5vB5NBGmh8iEIbDl4gTcj4s5zi4CQ2Nii7CGS54qpeRbXtq267jIrC1PUjTNG0HQnkhiqrqh-xXjIN7YRgD5PsoL4TO+rKfh235BBQf4om47j2IiqZOMO8aJjYCLxt2QGIcu5IQPSjL-HuHCHo+-CCNmyGUHJDIFveIyMWor6tmyoALJsFDwZo-hpD49jbLcNjDnYs7cummw3H22S8dJZ5afJuk4XhDRNC0yDtPaJEyZw2kKcW9GKAZ4xvgYH5+qZiBuP4FD8Q4dnRikfKZcOmVZdGcIeEKIbbG4eT5CApDoHAZgKiuZS0bIxlselizuRQ-hAV4fZZAV2xOeOWXAckqTpJk2Q+ZpJGwFSdCQJ1aUct+859ZGqbJBGTgRjGaKbWJ2X9ZoGy+GkM3zWRbV3o8QU1Gt7bdSOjjuXsHh2eB41gXY3IHVKngRvY-ELnVLW5hRhYahhZZGiaNbWi9X6Br42X8ZKQTpAEJweMOFVZb4iS7Gkk7dh4t0rhelHodRmG3oMGCo+xKSrJGdhJEBFOwYTGQUKkKyxJsGSnLkkMaWRtOw8WrNvamXiYw46bwUT+NgS4NiCxcPjhnYwRZNTsn+YpMjyxtNieBQcLjqm+WBLEXhObOMLIiis7+GG442Mb5AWwG31nJ9+yDdZwRjQdNt7OsWxZOBYa1TkQA */
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
          deleteTodo: {
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
            }
          | {
              type: 'Delete';
              todo: string;
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
            Delete: {
              target: 'delete todo',
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
        'delete todo': {
          invoke: {
            src: 'deleteTodo',
            onDone: [
              {
                target: 'loading todos',
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
