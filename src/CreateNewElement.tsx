import generatekey from "./ts/generatekey";
interface DataTableElement {
  id: number;
  name: string;
}

const AddNewElement = ({
  data,
  setData,
  setModify,
  config,
}: {
  data: DataTableElement[];
  setData: React.Dispatch<React.SetStateAction<DataTableElement[]>>;
  setModify: React.Dispatch<React.SetStateAction<any>>;
  config: any;
}) => {
  const newElement = {
    id: data.length + 1,
    name: "",
  };
  if (generatekey(config) === false) {
    return;
  }
  setData([...data, newElement]);
  setModify(newElement.id);
};

export default AddNewElement;
