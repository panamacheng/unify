import React, {useState} from 'react';
import {Row,Col,Modal,Button,Form} from 'react-bootstrap';
import MultiSelect from "react-multi-select-component";
import { connect } from 'react-redux';
import UserStoryActions from '../../actions/user-story';
import '../../styles/components/modal.scss';

function EditTaskModal({show, panel, onHide, createNewTask }) {
  const tagList = [
    { label: "Reporting", value: "reporting" },
    { label: "Admin Setting", value: "adminsetting" },
    { label: "Others", value: "others" }
  ];

  const priorityList = [
    {value: 'low', display: 'Low Priority'},
    {value: 'medium', display: 'Medium Priority'},
    {value: 'high', display: 'High Priority'},
  ];
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [tagData, setTagData] = useState("");
  const [checked, setChecked] = useState(false);

  const handleNameChange = (e) => setName(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handlePriorityChange = (e) => setPriority(e.target.value);
  const handleTagsChanges = (e) => setTagData(e);
  const handleCheckBox = (e) => setChecked(e.target.checked);

  const handleCreateTask = (e) => {
    if (checked) {
      let tags = [];
      for(let obj of tagData) {
        tags.push(obj.id);
      }
      const payload = {name, description, priority}
      payload.project_id = 1;
      payload.assignee_user_id = 1;
      payload.status = panel;
      
      createNewTask(payload);
      onHide();
    }
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <span>Add User Story</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Task Title</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Input task title.." 
              value={name}
              onChange={handleNameChange}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>What is your request?</Form.Label>
            <Form.Control 
              as="textarea" 
              rows="3"
              value={description}
              onChange={handleDescriptionChange} 
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.SelectCustom">
            <Form.Label>Choose the status...</Form.Label>
            <Form.Control 
              onChange={handlePriorityChange}
              value={priority}
              as="select" 
            >
              {priorityList.map((priority) => <option value={priority.value} key={priority.value}> {priority.display}</option>)}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Add a Tag to Your Request</Form.Label>
            <MultiSelect
              options={tagList}
              value={tagData}
              onChange={handleTagsChanges}
              labelledBy={"Select"}
            />
          </Form.Group>
          <Row>
            <Col md={9}>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Check
                  type="checkbox"
                  id="checkbox"
                  checked={checked}
                  onChange={handleCheckBox}
                  label="Please keep me information for any updates on this request"
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Button
                  onClick={handleCreateTask}
                  disabled={!checked}
                >Send</Button>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

const mapDispatchToProps = dispatch => ({
  createNewTask: payload => dispatch(UserStoryActions.createNewTaskRequest(payload)),
});

export default connect(null, mapDispatchToProps)(EditTaskModal);