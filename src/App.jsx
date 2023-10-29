import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import DeleteModal from './components/DeleteModal';
import EditModal from './components/EditModal';
import UpdateModal from './components/UpdateModal';
import './App.css';


const App = () => {
  const [customers, setCustomers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ name: '', email: '', image: null });
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Fetch data from API
  useEffect(() => {
    fetch('https://reqres.in/api/users?page=1')
      .then((response) => response.json())
      .then((data) => setCustomers(data.data));
  }, []);

  const handleDelete = () => {
    // Delete the selected customer from the list
    const updatedCustomers = customers.filter((customer) => customer.id !== selectedCustomer.id);
    setCustomers(updatedCustomers);
    setShowDeleteModal(false);
  };

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setShowEditModal(true);
  };

  const handleSave = (updatedCustomer) => {
    // Update the selected customer in the list
    const updatedCustomers = customers.map((customer) =>
      customer.id === updatedCustomer.id ? updatedCustomer : customer
    );
    setCustomers(updatedCustomers);
    setShowEditModal(false);
  };

  const handleUpdate = () => {
    // Handle update functionality
    // ...
    setShowUpdateModal(false);
  };

  const handleAdd = () => {
    // Add the new customer to the list
    const newCustomers = [...customers, newCustomer];
    setCustomers(newCustomers);
    setShowAddModal(false);
    setNewCustomer({ name: '', email: '', image: null });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setNewCustomer((prevCustomer) => ({
      ...prevCustomer,
      image: file,
    }));
  };

  return (

    <div>
      <div className='body'>
        <div className='sideBar'>
          <p>SAYIYNT</p>
          <Button className='sideBtn'>
            Customers
          </Button>
        </div>

        <div className='mainBody'>
          <div className='cusTag'>CUSTOMERS</div>
          <Button className='addCstmrBtn' variant="primary" onClick={() => setShowAddModal(true)}>
            +  Add New Customer
          </Button>
          <div className='tableHeader'>
            <div>
              <span>Custommer ID</span>
              <span>Custommer Name</span>
              <span>Email</span>
            </div>

          </div>
          <div>
            {customers.map((customer) => (

              <div className='mainTable'>
               <img src={customer.avatar} alt="image" />
                <div className='contant'>
                <span>00{customer.id}</span>
                <span  class="green_underline">{customer.first_name}</span>
                <span>{customer.email}</span></div>
              <div> 
                 <Button id='editBtn' onClick={() => handleEdit(customer)}>
                  Edit
                </Button>
                  <Button
                  id='deleteBtn'
                    onClick={() => {
                      setSelectedCustomer(customer);
                      setShowDeleteModal(true);
                    }}
                  >
                    Delete
                  </Button>
                  </div>
              </div>

            ))}
          </div>
        </div>

      </div>



      <DeleteModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleDelete={handleDelete}
      />

      <EditModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        handleSave={handleSave}
        customer={selectedCustomer}
      />

      <UpdateModal
        show={showUpdateModal}
        handleClose={() => setShowUpdateModal(false)}
        handleUpdate={handleUpdate}
      />

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="first_name"
                value={newCustomer.first_name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={newCustomer.email}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formImage">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" name="image" onChange={handleImageUpload} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default App;

