import React from "react";
import { Modal } from "rsuite";
import { Form } from "react-bootstrap";

function EmployeeModal({
  values,
  handleSubmitEdit,
  handleSubmitDelete,
  show,
  onHide,
  onChangeInput,
  handleOnChange,
  handleOnSubmit,
  headerKeys,
  array,
  error,
}) {
  return (
    <>
      <Modal centered open={show} onClose={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>
            {values.modalType == "EditEmployee" && "Edit Employee"}
            {values.modalType == "DeleteEmployee" && "Delete Employee"}
            {values.modalType == "UploadData" && "Upload Employee Data"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {values.modalType == "EditEmployee" && (
            <>
              <Form.Group>
                <Form.Label>Employee ID : {values.employeeId}</Form.Label>
              </Form.Group>
              <Form.Group>
                <Form.Label>Employee Name : </Form.Label>
                <input
                  id="employeeName"
                  type="text"
                  name="employeeName"
                  value={values.employeeName}
                  onChange={(e) => onChangeInput(e)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Employee Login : </Form.Label>
                <input
                  id="employeeLogin"
                  type="text"
                  name="employeeLogin"
                  value={values.employeeLogin}
                  onChange={(e) => onChangeInput(e)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Employee Salary : </Form.Label>
                <input
                  id="employeeSalary"
                  type="text"
                  name="employeeSalary"
                  value={values.employeeSalary}
                  onChange={(e) => onChangeInput(e)}
                />
              </Form.Group>
            </>
          )}
          {values.modalType == "DeleteEmployee" && (
            <>
              Are you sure you want to delete the employee with id :
              {" " + values.employeeId}
            </>
          )}
          {values.modalType == "UploadData" && (
            <div style={{ textAlign: "center" }}>
              <form>
                <input
                  type={"file"}
                  id={"csvFileInput"}
                  onChange={handleOnChange}
                />

                <button
                  onClick={(e) => {
                    handleOnSubmit(e);
                  }}
                >
                  Import CSV
                </button>
              </form>

              <br />

              {error ? (
                <h6>{error}</h6>
              ) : (
                <>
                  {array.length > 0 && (
                    <div>
                      <h6>Data has been successfully imported.</h6>
                      <h6>Preview of data: </h6>
                    </div>
                  )}
                  <table>
                    <thead>
                      <tr key={"header"}>
                        {headerKeys.map((key) => (
                          <th>{key}</th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {array.map((item) => (
                        <tr key={item.id}>
                          {Object.values(item).map((val) => (
                            <td>{val}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {values.modalType == "EditEmployee" && (
            <button onClick={handleSubmitEdit}>Save</button>
          )}
          {values.modalType == "DeleteEmployee" && (
            <button onClick={handleSubmitDelete}>Delete</button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EmployeeModal;
