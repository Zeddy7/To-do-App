import createTodo from "./todo.js";

export default function createProject(title, description, todos = [], saveCallback) {
  let todoList = todos;
  let privateTitle = title;
  let privateDescription = description;
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
  const getDesc = () => privateDescription;
  
  const setTitle = newTitle => {
    privateTitle = newTitle;
    onSave();
  };
  
  const setDesc = newDescription => {
    privateDescription = newDescription;
    onSave();
  };

  const toJSON = () => ({
    title: privateTitle,
    description: privateDescription,
    todos: todoList.map(todo => todo.toJSON()),
  });

  return {
    getTitle,
    getDesc,
    setTitle,
    setDesc,
    addNewTodo,
    removeTodo,
    getTodoList,
    toJSON,
  };
}
