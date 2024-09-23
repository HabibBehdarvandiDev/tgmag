import DeleteButton from "./DeleteButton";
import DetailsButton from "./DetailsButton";
import EditButton from "./EditButton";

const TableActions = ({ id, name }: { id: number; name: string }) => {
  return (
    <div className="flex gap-2">
      <DeleteButton id={id} name={name} />
      <EditButton id={id} />
      <DetailsButton id={id} />
    </div>
  );
};

export default TableActions;
