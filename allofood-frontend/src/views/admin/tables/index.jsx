import CheckTable from "./components/CheckTable";

import {
  columnsDataCheck,
 
} from "./variables/columnsData";
import tableDataCheck from "./variables/tableDataCheck.json";


const Tables = () => {
  return (
    <div>

        <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
      </div>
  );
};

export default Tables;
