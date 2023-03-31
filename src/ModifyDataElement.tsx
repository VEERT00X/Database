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

function ModifyElement({
  data,
  setData,
  usId,
  Modify,
  setModify,
  ModifyData,
  setModifyData,
  config,
}: {
  data: DataTableElement[];
  setData: React.Dispatch<React.SetStateAction<DataTableElement[]>>;
  usId: number;
  Modify: any;
  setModify: React.Dispatch<React.SetStateAction<any>>;
  ModifyData: any;
  setModifyData: React.Dispatch<React.SetStateAction<any>>;
  config: any;
}) {
  const startModify = () => {
    if (Modify === usId) {
      setModify(null);
      setData(
        data.map((row) => {
          if (row.id === usId) {
            return { ...row, ...ModifyData };
          }
          return row;
        })
      );
      return;
    }
    if (generatekey(config.promptcheck) === false) {
      return;
    }
    setModify(usId);
    setModifyData(data.find((row) => row.id === usId) as DataTableElement);
  };

  const cancelModify = () => {
    setModify(null);
  };

  return (
    <div>
      <button onClick={startModify}>
        {Modify === usId ? "Save" : "Modify"}
      </button>
      {Modify === usId ? <button onClick={cancelModify}>Cancel</button> : null}
      {Modify === usId ? (
        <button
          onClick={() => {
            setModify(null);
            setData(data.filter((row) => row.id !== usId));
          }}
        >
          Delete
        </button>
      ) : null}
    </div>
  );
}

export default ModifyElement;
