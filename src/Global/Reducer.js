export const ACTIONS = {
  NEW_TODO: "add-todo",
  TOGGLE_TODO: "toggle-todo",
  DELETE_TODO: "delete-todo",
  EDIT_TODO: "edit-todo",
};

function newToDo(name) {
  return { id: Date.now(), name: name, complete: false };
}

export function reducer(todos, action) {
  switch (action.type) {
    case ACTIONS.NEW_TODO:
      return [...todos, newToDo(action.payload.name)];
    case ACTIONS.TOGGLE_TODO:
      return todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      });
    case ACTIONS.DELETE_TODO:
      return todos.filter((todo) => todo.id !== action.payload.id);
    case ACTIONS.EDIT_TODO:
      return todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, name: "nowa wartość" };
        }
        return todo;
      });

    default:
      console.log("cokolwiek");
  }
}
