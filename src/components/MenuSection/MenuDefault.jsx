import bin from "../../assets/Icon.png";
import check from "../../assets/Library add check.png";

export default function MenuDefault({
  list,
  toDoListisClicked,
  deleteTask,
  trashListisClicked,
  deleteForever,
  moveBackToToDo,
}) {
  const atLeastOneClick = () => list.some((item) => item.done);

  if (!atLeastOneClick()) return null;

  return (
    <>
      {toDoListisClicked && (
        <button
          onClick={deleteTask}
          className="sm:ml-[8%] sm:mt-[1%] sm:w-[20%] sm:p-[0] sm:pt-[1%] sm:pb-[1%] sm:flex sm:justify-start sm:gap-[1rem]
                     xs:flex xs:gap-[0.6rem] xs:w-[50%] xs:p-[2%] xs:mt-[2%]
                     bg-[#E4E6E7] rounded-[1rem] font-[Inter] font-medium"
        >
          <img src={bin} alt="Trash icon" />
          Move to Trash
        </button>
      )}
      {trashListisClicked && (
        <div
          className="sm:ml-[8%] sm:mt-[1%] sm:w-[22%] sm:pt-[1%] sm:pb-[1%]
                     xs:w-[65%] xs:mt-[2%] xs:p-[2%] xs:gap-[0.5rem]
                     flex flex-col gap-[1rem] xs:justify-center justify-start
                     bg-[#E4E6E7] rounded-[1rem] font-[Inter] font-medium"
        >
          <button onClick={deleteForever} className="flex gap-[0.8rem]">
            <img src={bin} alt="Trash icon" />
            Delete forever
          </button>
          <button onClick={moveBackToToDo} className="flex gap-[0.8rem]">
            <img src={check} alt="Check icon" />
            Move Back To To Do
          </button>
        </div>
      )}
    </>
  );
}