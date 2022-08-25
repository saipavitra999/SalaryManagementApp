import React, { useEffect, useState } from "react";
import { Table } from "rsuite";
import * as MdIcons from "react-icons/md";
import { Row, Col } from "react-bootstrap";

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
];

function EmployeeDashboard({ ...props }) {
  const [employeeList, setEmployeeList] = useState(dummyEmployees);
  const [showModal, setShowModal] = useState(false);
  const [values, setValues] = useState({
    employeeName: null,
  });

  function modalpopup(data, modalType) {
    setShowModal(true);
    if (modalType == "EditEmployee") {
      console.log("test");
    }
    if (modalType == "DeleteEmployee") {
      console.log("test");
    }
  }

  return (
    <div>
      <h3>Employee Salary Management Dashboard</h3>
      <h5>Employee List</h5>
      <Table autoHeight headerHeight={50} data={employeeList}>
        <Column width={200}>
          <HeaderCell>Id</HeaderCell>
          <Cell dataKey="id" />
        </Column>
        <Column width={300}>
          <HeaderCell>Username</HeaderCell>
          <Cell dataKey="username" />
        </Column>
        <Column width={300}>
          <HeaderCell>Full Name</HeaderCell>
          <Cell dataKey="fullname" />
        </Column>
        <Column width={300}>
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
    </div>
  );
}

export default EmployeeDashboard;
