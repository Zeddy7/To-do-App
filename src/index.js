const TodoModule = (function () {
   const projectList = [];

   const addProject = (title, description) =>
      projectList.push(createProject(title, description));

   const getProjects = () =>
      projectList.forEach(item => {
         console.log(item);
      });

   function createProject(title, description) {
      let todoList = [];
      let privateTitle = title;
      let privateDescription = description;

      const addNewTodo = (title, description, dueDate, priority) => {
         todoList.push(createTodo(title, description, dueDate, priority));
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

   function createTodo(title, description, dueDate, priority) {
      let privateTitle = title;
      let privateDescription = description;
      let privateDueDate = dueDate;
      let privatePriority = priority;
      let isComplete = false;

      const getTitle = () => privateTitle;
      const getDesc = () => privateDescription;
      const getDate = () => privateDueDate;
      const getPrio = () => privatePriority;
      const getCompStatus = () => isComplete;

      const setTitle = newTitle => (privateTitle = newTitle);
      const setDesc = newDescription => (privateDescription = newDescription);
      const setDate = newDueDate => (privateDueDate = newDueDate);
      const setPrio = newPriority => (privatePriority = newPriority);
      const toggleCompStatus = () => (isComplete = !isComplete);

      return {
         getTitle,
         getDesc,
         getDate,
         getPrio,
         getCompStatus,
         setTitle,
         setDesc,
         setDate,
         setPrio,
         toggleCompStatus,
      };
   }

   return { addProject, getProjects };
})();
