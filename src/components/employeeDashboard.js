import React, { useEffect, useState } from "react";
import { Table, Pagination } from "rsuite";
import * as MdIcons from "react-icons/md";
import { Row, Col } from "react-bootstrap";
import EmployeeModal from "./EmployeeModal";

const { Column, HeaderCell, Cell } = Table;

//assume dummy data in db
let dummyEmployees = [
  {
    id: "id1",
    username: "user1",
    fullname: "Monica Geller",
    salary: 1000.0,
  },
  {
    id: "id2",
    username: "user2",
    fullname: "Chandler Bing",
    salary: 1000.5,
  },
  {
    id: "id3",
    username: "user3",
    fullname: "Rachel Green",
    salary: 0.0,
  },
  {
    id: "id4",
    username: "user4",
    fullname: "Ross Geller",
    salary: 5000.0,
  },
  {
    id: "id5",
    username: "user5",
    fullname: "James Geller",
    salary: 1000.0,
  },
  {
    id: "id6",
    username: "user6",
    fullname: "Bobby Brown",
    salary: 1000.5,
  },
  {
    id: "id7",
    username: "user7",
    fullname: "Thomas Green",
    salary: 0.0,
  },
  {
    id: "id8",
    username: "user8",
    fullname: "Jessi Geller",
    salary: 5000.0,
  },
  {
    id: "id9",
    username: "user9",
    fullname: "Amelia Geller",
    salary: 1000.0,
  },
  {
    id: "id10",
    username: "user10",
    fullname: "Jason Bing",
    salary: 1000.5,
  },
  {
    id: "id11",
    username: "user11",
    fullname: "Edward Green",
    salary: 0.0,
  },
  {
    id: "id12",
    username: "user12",
    fullname: "Kelly Kim",
    salary: 5000.0,
  },
];

const styles = {
  leftDisplay: {
    display: "flex",
    justifyContent: "left",
    alignItems: "left",
    padding: 20,
  },
  rightDisplay: {
    display: "flex",
    justifyContent: "right",
    alignItems: "right",
    padding: 20,
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerStyle: {
    padding: 30,
  },
};

function EmployeeDashboard({ ...props }) {
  const [employeeList, setEmployeeList] = useState(dummyEmployees);
  const [showModal, setShowModal] = useState(false);
  const [sortColumn, setSortColumn] = React.useState();
  const [sortType, setSortType] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [file, setFile] = useState(null);
  const [array, setArray] = useState([]);
  const [error, setError] = useState("");
  const [values, setValues] = useState({
    employeeName: null,
    employeeId: null,
    employeeLogin: null,
    employeeSalary: null,
    modalType: null,
    filterSalaryMin: null,
    filterSalaryMax: null,
  });

  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };

  const data = employeeList.filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });

  const getData = () => {
    if (sortColumn && sortType) {
      return data.sort((a, b) => {
        let x = a[sortColumn];
        let y = b[sortColumn];
        if (typeof x === "string") {
          x = x.charCodeAt();
        }
        if (typeof y === "string") {
          y = y.charCodeAt();
        }
        if (sortType === "asc") {
          return x - y;
        } else {
          return y - x;
        }
      });
    }
    return data;
  };

  const handleSortColumn = (sortColumn, sortType) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };

  function modalpopup(data, modalType) {
    setShowModal(true);
    if (modalType == "EditEmployee") {
      setValues(() => ({
        ...values,
        employeeId: data.id,
        employeeName: data.fullname,
        employeeLogin: data.username,
        employeeSalary: data.salary,
        modalType: "EditEmployee",
      }));
    }
    if (modalType == "DeleteEmployee") {
      setValues(() => ({
        ...values,
        employeeId: data.id,
        modalType: "DeleteEmployee",
      }));
    }
    if (modalType == "UploadData") {
      setError("");
      setFile(null);
      setArray([]);
      setValues(() => ({
        ...values,
        modalType: "UploadData",
      }));
    }
  }

  const onChangeInput = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  function handleSubmitEdit() {
    console.log("Edit User");
  }

  function handleSubmitDelete() {
    console.log("Delete User");
  }

  function handleSubmitFilter() {
    if (values.filterSalaryMin && values.filterSalaryMax) {
      const result = dummyEmployees.filter(checkSalary);
      function checkSalary(employee) {
        return (
          employee.salary >= values.filterSalaryMin &&
          employee.salary <= values.filterSalaryMax
        );
      }
      setEmployeeList(result);
    } else {
      setEmployeeList(dummyEmployees);
    }
    setValues({
      ...values,
      filterSalaryMin: null,
      filterSalaryMax: null,
    });
  }

  //csv upload
  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setError("");
    const allowedExtensions = ["csv"];
    if (e.target.files.length) {
      const inputFile = e.target.files[0];
      const fileExtension = inputFile?.type.split("/")[1];
      if (!allowedExtensions.includes(fileExtension)) {
        setError("Invalid file format. Please input a csv file");
        return;
      }
      setFile(e.target.files[0]);
    }
  };

  const csvFileToArray = (string) => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");
    const array = csvRows.map((i) => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });
    setArray(array);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
      };
      fileReader.readAsText(file);
    }
  };

  const headerKeys = Object.keys(Object.assign({}, ...array));

  return (
    <div style={styles.containerStyle}>
      <h3>Employee Salary Management Dashboard</h3>
      <h5 style={styles.leftDisplay}>Employee List</h5>

      <div style={styles.flexRow}>
        <span style={styles.leftDisplay}>
          Enter Mininum Salary :
          <input
            id="filterSalaryMin"
            type="text"
            name="filterSalaryMin"
            value={values.filterSalaryMin}
            onChange={(e) => onChangeInput(e)}
          />
          Enter Maximum Salary :
          <input
            id="filterSalaryMax"
            type="text"
            name="filterSalaryMax"
            value={values.filterSalaryMax}
            onChange={(e) => onChangeInput(e)}
          />
          <button onClick={handleSubmitFilter}>Filter</button>
        </span>
        <span style={styles.rightDisplay}>
          <button onClick={() => modalpopup(null, "UploadData")}>
            Upload Data
          </button>
        </span>
      </div>

      <Table
        height={480}
        headerHeight={50}
        data={getData()}
        loading={loading}
        sortColumn={sortColumn}
        sortType={sortType}
        onSortColumn={handleSortColumn}
      >
        <Column width={250} sortable>
          <HeaderCell>Id</HeaderCell>
          <Cell dataKey="id" />
        </Column>
        <Column width={250} sortable>
          <HeaderCell>Username</HeaderCell>
          <Cell dataKey="username" />
        </Column>
        <Column width={250} sortable>
          <HeaderCell>Full Name</HeaderCell>
          <Cell dataKey="fullname" />
        </Column>
        <Column width={250} sortable>
          <HeaderCell>Salary</HeaderCell>
          <Cell dataKey="salary" />
        </Column>
        <Column width={250}>
          <HeaderCell>Action</HeaderCell>
          <Cell>
            {(rowData) => (
              <>
                <span>
                  {
                    <MdIcons.MdOutlineEdit
                      onClick={() => modalpopup(rowData, "EditEmployee")}
                    />
                  }
                </span>
                <span>
                  {
                    <MdIcons.MdDeleteOutline
                      onClick={() => modalpopup(rowData, "DeleteEmployee")}
                    />
                  }
                </span>
              </>
            )}
          </Cell>
        </Column>
      </Table>
      <div style={{ padding: 20 }}>
        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          maxButtons={5}
          size="xs"
          layout={["total", "-", "limit", "|", "pager", "skip"]}
          total={employeeList.length}
          limitOptions={[5, 10, 15]}
          limit={limit}
          activePage={page}
          onChangePage={setPage}
          onChangeLimit={handleChangeLimit}
        />
      </div>
      <EmployeeModal
        show={showModal}
        onHide={() => setShowModal(!showModal)}
        values={values}
        onChangeInput={onChangeInput}
        handleSubmitEdit={handleSubmitEdit}
        handleSubmitDelete={handleSubmitDelete}
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
        headerKeys={headerKeys}
        array={array}
        error={error}
      />
    </div>
  );
}

export default EmployeeDashboard;
