import React from "react";
import { Modal } from "rsuite";

function EmployeeModal({ values, handleSubmitEdit }) {
  return (
    <>
      <Modal centered show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{"Edit User"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group>
            <Form.Label>Employee Name</Form.Label>
            <input
              id="selectedEmployeeName"
              type="text"
              name="selectedEmployeeName"
              value={values.employeeName}
              readOnly
            />
          </Form.Group>

          <button type="submit" onClick={handleSubmitEdit}>
            Edit
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EmployeeModal;
