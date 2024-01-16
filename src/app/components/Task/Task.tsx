import { Draggable } from "@hello-pangea/dnd";
interface ITaskProps {
  task: {
    id: string;
    name: string;
  };
  index: number;
  deleteTask: (id: string) => void;
}

export default function Task({ task, index, deleteTask }: ITaskProps) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="w-full border-b-2 border-black pb-2 text-sm md:text-2xl flex justify-between items-center pr-2"
        >
          <p className="select-none ">{task.name}</p>
          <span className="cursor-pointer" onClick={() => deleteTask(task.id)}>
            x
          </span>
        </li>
      )}
    </Draggable>
  );
}
