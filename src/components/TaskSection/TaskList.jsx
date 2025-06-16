import Task from "./Task";

export default function TaskList({ list, doneTask, trashListisClicked }) {
  console.log(list, "List");
  return list.map((item, index) => (
    <Task
      key={index}
      task={item}
      doneTask={doneTask}
      trashListisClicked={trashListisClicked}
    />
  ));
}
