import React, { useEffect, useState } from "react";
import { Table } from "rsuite";
import * as MdIcons from "react-icons/md";
import { Row, Col } from "react-bootstrap";
import EmployeeModal from "./EmployeeModal";

const { Column, HeaderCell, Cell, Pagination } = Table;

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
];

function EmployeeDashboard({ ...props }) {
  const [employeeList, setEmployeeList] = useState(dummyEmployees);
  const [showModal, setShowModal] = useState(false);
  const [sortColumn, setSortColumn] = React.useState();
  const [sortType, setSortType] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [values, setValues] = useState({
    employeeName: null,
    employeeId: null,
    employeeLogin: null,
    employeeSalary: null,
    modalType: null,
  });

  const getData = () => {
    if (sortColumn && sortType) {
      return employeeList.sort((a, b) => {
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
    return employeeList;
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

  return (
    <div>
      <h3>Employee Salary Management Dashboard</h3>
      <h5>Employee List</h5>
      <Table
        autoHeight
        headerHeight={50}
        data={getData()}
        loading={loading}
        sortColumn={sortColumn}
        sortType={sortType}
        onSortColumn={handleSortColumn}
      >
        <Column width={200} sortable>
          <HeaderCell>Id</HeaderCell>
          <Cell dataKey="id" />
        </Column>
        <Column width={300} sortable>
          <HeaderCell>Username</HeaderCell>
          <Cell dataKey="username" />
        </Column>
        <Column width={300} sortable>
          <HeaderCell>Full Name</HeaderCell>
          <Cell dataKey="fullname" />
        </Column>
        <Column width={300} sortable>
          <HeaderCell>Salary</HeaderCell>
          <Cell dataKey="salary" />
        </Column>
        <Column width={300}>
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

      <EmployeeModal
        show={showModal}
        onHide={() => setShowModal(!showModal)}
        values={values}
        onChangeInput={onChangeInput}
        handleSubmitEdit={handleSubmitEdit}
        handleSubmitDelete={handleSubmitDelete}
      />
    </div>
  );
}

export default EmployeeDashboard;
