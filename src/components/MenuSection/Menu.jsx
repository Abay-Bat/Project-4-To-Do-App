import { useEffect, useState } from "react";
import TaskList from "../TaskSection/TaskList";
import MenuDefault from "./MenuDefault";

export default function Menu() {
  const [typeWindowisClicked, setTypeWindowisClicked] = useState(false);
  const [currentButton, setCurrentButton] = useState("To Do");
  const [toDoListisClicked, setToDoListisClicked] = useState(true);
  const [trashListisClicked, setTrashListisClicked] = useState(false);
  const [doneListisClicked, setDoneListisClicked] = useState(false);

  const [arrayToDoList, setArrayToDoList] = useState(() => {
    const data = localStorage.getItem("array");
    return data ? JSON.parse(data) : [];
  });

  const [currentList, setCurrentList] = useState(() => {
    const data = localStorage.getItem("array");
    if (!data) return [];
    const parsed = JSON.parse(data);
    return parsed.filter((item) => !item.done && !item.deleted);
  });

  const [currentTask, setCurrentTask] = useState("");

  useEffect(() => {
    localStorage.setItem("array", JSON.stringify(arrayToDoList));
  }, [arrayToDoList]);

  const handleTypeWindowButton = () => setTypeWindowisClicked((prev) => !prev);

  const handleCurrentList = (list) => {
    setCurrentButton(list);
    setToDoListisClicked(list === "To Do");
    setTrashListisClicked(list === "Trash");
    setDoneListisClicked(list === "Done");

    const filters = {
      "To Do": (item) => !item.done && !item.deleted,
      "Trash": (item) => item.deleted,
      "Done": (item) => item.done && !item.deleted,
    };

    setCurrentList(arrayToDoList.filter(filters[list]));
  };

  const addTask = () => {
    const trimmed = currentTask.trim();
    if (!trimmed) {
      alert("The Input is empty, try again!");
      return;
    }

    const exists = arrayToDoList.find(
      (item) => item.name.toLowerCase() === trimmed.toLowerCase()
    );
    if (exists) {
      alert("This task already existed!");
      setCurrentTask("");
      return;
    }

    const newTask = { name: trimmed, done: false, deleted: false };
    const newArray = [...arrayToDoList, newTask];
    setArrayToDoList(newArray);
    setCurrentTask("");

    if (toDoListisClicked) {
      setCurrentList(newArray.filter((item) => !item.done && !item.deleted));
    }
  };

  const doneTask = (task) => {
    const newArray = arrayToDoList.map((item) =>
      item.name === task.name ? { ...item, done: !item.done } : item
    );
    setArrayToDoList(newArray);

    setCurrentList((prev) =>
      prev.map((item) =>
        item.name === task.name ? { ...item, done: !item.done } : item
      )
    );
  };

  const deleteTask = () => {
    const toTrash = currentList.filter((item) => item.done);
    const updated = arrayToDoList.map((item) =>
      toTrash.find((t) => t.name === item.name)
        ? { ...item, done: false, deleted: true }
        : item
    );
    setArrayToDoList(updated);
    setCurrentList((prev) =>
      prev.filter((item) => !item.done && !item.deleted)
    );
  };

  const deleteForever = () => {
    const toRemove = currentList.filter((item) => item.done);
    const updatedArray = arrayToDoList.filter(
      (item) => !toRemove.find((t) => t.name === item.name)
    );
    setArrayToDoList(updatedArray);
    setCurrentList((prev) =>
      prev.filter((item) => !toRemove.find((t) => t.name === item.name))
    );
    localStorage.setItem("array", JSON.stringify(updatedArray));
  };

  const moveBackToToDo = () => {
    const toRestore = currentList.filter((item) => item.done);
    const updated = arrayToDoList.map((item) =>
      toRestore.find((t) => t.name === item.name)
        ? { ...item, done: false, deleted: false }
        : item
    );
    setArrayToDoList(updated);
    setCurrentList((prev) =>
      prev.filter((item) => !item.done && item.deleted)
    );
  };

  const getButtonClass = (isActive) =>
    `w-[20%] xs:w-[25%] p-[2%] rounded-full transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 ${
      isActive ? "bg-[#081E346B] hover:brightness-110" : "bg-[#F0F0F0] hover:brightness-95"
    }`;

  return (
    <>
      <div className="flex ml-[10%] mt-[10%] font-[Inter] gap-[15%]">
        <div className="sm:flex sm:flex-col sm:gap-[7rem] xs:flex xs:gap-[3rem] xs:flex-col">
          <div className="flex flex-col gap-[2rem]">
            <div className="sm:text-[2.5rem] sm:flex sm:justify-start font-bold xs:text-[1.8rem] xs:flex xs:justify-center">
              Simple To Do List
            </div>
            <div className="xs:text-center sm:text-start">
              Today is awesome day. The weather is awesome, you are awesome too!
            </div>
          </div>

          <div className="sm:flex gap-[2rem] xs:flex xs:gap-[1rem] xs:justify-center sm:justify-start ">
            <button onClick={() => handleCurrentList("To Do")} className={getButtonClass(toDoListisClicked)}>To Do</button>
            <button onClick={() => handleCurrentList("Done")} className={getButtonClass(doneListisClicked)}>Done</button>
            <button onClick={() => handleCurrentList("Trash")} className={getButtonClass(trashListisClicked)}>Trash</button>
          </div>
        </div>

        <div className="sm:flex gap-[1rem] xs:hidden">
          {typeWindowisClicked && (
            <div className="flex flex-col gap-[1.5rem] rounded-[0.5rem] bg-[#E4E6E7] p-[5%]">
              <div className="flex items-center">Add New To Do</div>
              <textarea
                placeholder="Type New Task..."
                rows={4}
                cols={40}
                value={currentTask}
                onChange={(e) => setCurrentTask(e.target.value)}
                className="w-[95%] p-[5%] rounded-[0.5rem]"
              ></textarea>
              <button
                onClick={addTask}
                className="bg-black text-white w-[30%] p-3 rounded-full hover:bg-gray-800 hover:scale-105 transition-all duration-200 ease-in-out cursor-pointer shadow-md"
              >
                Add
              </button>
            </div>
          )}
          <div className="flex flex-col-reverse min-[320px]:hidden min-[640px]:flex">
            <button
              onClick={handleTypeWindowButton}
              className="w-16 h-16 bg-black rounded-full p-2 text-2xl text-white hover:bg-gray-800 hover:scale-105 transition duration-200 ease-in-out cursor-pointer "
            >
              ＋
            </button>
          </div>
        </div>
      </div>

      <div className="sm:hidden xs:mt-[5%] xs:p-[3%] xs:ml-[14%] xs:w-[75%] xs:flex xs:gap-[0.3rem]">
        <textarea
          placeholder="Type New Task..."
          rows={1}
          value={currentTask}
          onChange={(e) => setCurrentTask(e.target.value)}
          className="xs:w-[100%] xs:p-[3%] xs:rounded-[1rem] xs:border-grey-300 xs:border-2"
        ></textarea>
      </div>
      <button
        onClick={addTask}
        className="sm:hidden xs:bg-black xs:text-white xs:w-[20%] xs:rounded-[9999px] xs:ml-[40%] xs:mt-[3%] xs:p-[2%] "
      >
        Add
      </button>

      <div className="border-b-blue-500 ml-[10%] mt-[3%] flex flex-col gap-[2rem]">
        <div className="font-medium text-[2rem]">{currentButton}</div>
        <hr className="border-2 w-[90%]" />
      </div>

      {currentList.length > 0 && (
        <TaskList
          list={currentList}
          doneTask={doneTask}
          trashListisClicked={trashListisClicked}
        />
      )}
      <MenuDefault
        list={currentList}
        toDoListisClicked={toDoListisClicked}
        deleteTask={deleteTask}
        trashListisClicked={trashListisClicked}
        deleteForever={deleteForever}
        moveBackToToDo={moveBackToToDo}
      />
    </>
  );
}
