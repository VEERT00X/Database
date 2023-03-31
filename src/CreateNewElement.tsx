import generatekey from "./ts/generatekey";
interface DataTableElement {
  id: number;
  name: string;
  surname: string;
  nickname: string;
  age: string;
  email: string;
  telephone: string;
  address: string;
  city: string;
  country: string;
  relationship: string;
  status: string;
}

const AddNewElement = ({
  data,
  setData,
  setModify,
}: {
  data: DataTableElement[];
  setData: React.Dispatch<React.SetStateAction<DataTableElement[]>>;
  setModify: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const newElement = {
    id: data.length + 1,
    name: "",
    surname: "",
    nickname: "",
    age: "",
    email: "",
    telephone: "",
    address: "",
    city: "",
    country: "",
    relationship: "",
    status: "",
  };
  if (generatekey() === false) {
    return;
  }
  setData([...data, newElement]);
  setModify(newElement.id);
};

export default AddNewElement;
