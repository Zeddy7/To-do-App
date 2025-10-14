import createTodo from "./todo.js";

export default function createProject(title, todos = [], saveCallback) {
  let todoList = todos;
  let privateTitle = title;
  let onSave = saveCallback;

  const addNewTodo = (title, description, dueDate, priority) => {
    const newTodo = createTodo(title, description, dueDate, priority, false, onSave);
    todoList.push(newTodo);
    onSave();
  };

  const removeTodo = index => {
    todoList.splice(index, 1);
    onSave();
  };
  
  const getTodoList = () => todoList;
  const getTitle = () => privateTitle;
  
  const setTitle = newTitle => {
    privateTitle = newTitle;
    onSave();
  };
  
  const toJSON = () => ({
    title: privateTitle,
    todos: todoList.map(todo => todo.toJSON()),
  });

  return {
    getTitle,
    setTitle,
    addNewTodo,
    removeTodo,
    getTodoList,
    toJSON,
  };
}
