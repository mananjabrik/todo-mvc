// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {
    assignTodoToContext: "done.invoke.todo machine.loading todos:invocation[0]";
    assignErrorToContext:
      | "error.platform.todo machine.loading todos:invocation[0]"
      | "error.platform.todo machine.create new todo.Saving todo:invocation[0]";
    assignFormInputToContext: "Form input Change";
  };
  internalEvents: {
    "done.invoke.todo machine.loading todos:invocation[0]": {
      type: "done.invoke.todo machine.loading todos:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.todo machine.loading todos:invocation[0]": {
      type: "error.platform.todo machine.loading todos:invocation[0]";
      data: unknown;
    };
    "error.platform.todo machine.create new todo.Saving todo:invocation[0]": {
      type: "error.platform.todo machine.create new todo.Saving todo:invocation[0]";
      data: unknown;
    };
    "done.invoke.todo machine.create new todo.Saving todo:invocation[0]": {
      type: "done.invoke.todo machine.create new todo.Saving todo:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    loadTodos: "done.invoke.todo machine.loading todos:invocation[0]";
    addTodo: "done.invoke.todo machine.create new todo.Saving todo:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    services: "loadTodos" | "addTodo";
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    loadTodos: "done.invoke.todo machine.create new todo.Saving todo:invocation[0]";
    addTodo: "Submit";
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates:
    | "loading todos"
    | "todos loaded"
    | "loading todo error"
    | "create new todo"
    | "create new todo.Showing Form Input"
    | "create new todo.Saving todo"
    | { "create new todo"?: "Showing Form Input" | "Saving todo" };
  tags: never;
}
