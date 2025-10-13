import createTodo from './todo.js'

export default function createProject(title, description) {
   let todoList = [];
   let privateTitle = title;
   let privateDescription = description;

   const addNewTodo = (title, description, dueDate, priority) => {
      todoList.push(createTodo(title, description, dueDate, priority));
      saveData();
      // How to save the state after adding a todo?
      // You could call saveToLocalStorage() here, but the factory can't
      // access it directly. You need a way to connect it back.
      // Maybe the parent module needs to be aware of this action.
   };

   const removeTodo = index => todoList.splice(index, 1);
   const getTodoList = () => todoList;
   const getTitle = () => privateTitle;
   const getDesc = () => privateDescription;
   const setTitle = newTitle => (privateTitle = newTitle);
   const setDesc = newDescription => (privateDescription = newDescription);

   return {
      getTitle,
      getDesc,
      setTitle,
      setDesc,
      addNewTodo,
      removeTodo,
      getTodoList,
   };
}
