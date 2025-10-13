export default function createTodo(title, description, dueDate, priority) {
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
