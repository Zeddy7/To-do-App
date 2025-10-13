export default function createTodo(title, description, dueDate, priority, isComplete = false, saveCallback) {
  let privateTitle = title;
  let privateDescription = description;
  let privateDueDate = dueDate;
  let privatePriority = priority;
  let complete = isComplete;
  let onSave = saveCallback;

  const getTitle = () => privateTitle;
  const getDesc = () => privateDescription;
  const getDate = () => privateDueDate;
  const getPrio = () => privatePriority;
  const getCompStatus = () => complete;

  const setTitle = newTitle => {
    privateTitle = newTitle;
    onSave();
  };
  const setDesc = newDescription => {
    privateDescription = newDescription;
    onSave();
  };
  const setDate = newDueDate => {
    privateDueDate = newDueDate;
    onSave();
  };
  const setPrio = newPriority => {
    privatePriority = newPriority;
    onSave();
  };
  const toggleCompStatus = () => {
    complete = !complete;
    onSave();
  };
  
  // This method is automatically called by JSON.stringify
  const toJSON = () => ({
    title: privateTitle,
    description: privateDescription,
    dueDate: privateDueDate,
    priority: privatePriority,
    isComplete: complete,
  });

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
    toJSON
  };
}