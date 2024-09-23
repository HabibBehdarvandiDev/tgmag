import DeleteButton from "./DeleteButton";
import DetailsButton from "./DetailsButton";
import EditButton from "./EditButton";

const TableActions = ({ id }: { id: number }) => {
  return (
    <div className="flex gap-2">
      <DeleteButton id={id} />
      <EditButton id={id} />
      <DetailsButton id={id} />
    </div>
  );
};

export default TableActions;
