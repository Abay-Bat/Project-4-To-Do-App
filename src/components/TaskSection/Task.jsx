import icon from "../../assets/Icon Menu.png";

export default function Task({ task, doneTask, trashListisClicked }) {
  return (
    <div className="flex gap-[0.7rem] sm:ml-[7%] mt-[1%] sm:w-[35%] xs:w-[90%] xs:ml-[2%] xs:mt-[1%] hover:bg-[#E4E6E7] p-[0.3rem]">
      <img className="sm:ml-[0.5rem]" src={icon} alt="Task icon" />
      <div className="flex justify-center items-center">
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => doneTask(task)}
        />
      </div>
      <div className={task.done ? "line-through" : ""}>{task.name}</div>
    </div>
  );
}
