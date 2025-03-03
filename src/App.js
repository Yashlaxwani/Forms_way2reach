
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button, Modal, Table, Form } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid'; // You'll need to install this: npm install uuid

function App() {
  const [students, setStudents] = useState([]);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [token, setToken] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    photo: '',
    gender: '',
    subject: ''
  });
  
  const subjects = [
    'Mathematics', 
    'Physics', 
    'Chemistry', 
    'Biology', 
    'Computer Science',
    'English',
    'History',
    'Geography'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (checked) {
        setFormData({
          ...formData,
          gender: name
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          photo: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
   
    const newToken = uuidv4();
    setToken(newToken);
    
    // Log token to console
    console.log('Generated Token:', newToken);
    
    // Add new student with token
    const newStudent = {
      ...formData,
      id: newToken
    };
    
    setStudents([...students, newStudent]);
    
    // Show success modal
    setShowSuccessModal(true);
    
    // Clear form
    setFormData({
      name: '',
      email: '',
      phone: '',
      photo: '',
      gender: '',
      subject: ''
    });
    
    // Show dashboard after submission
    setShowDashboard(true);
  };

  const handleDelete = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  const handleEdit = (student) => {
    setFormData(student);
    setShowDashboard(false);
  };

  const handleImagePreview = (photo) => {
    setSelectedImage(photo);
    setShowImagePreview(true);
  };

  return (
    <Container className="py-5">
      {!showDashboard ? (
        <Card className="shadow-sm">
          <Card.Header className="bg-primary text-white">
            <h3 className="mb-0">Student Registration Form</h3>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter full name"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter email address"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter phone number"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Subject</Form.Label>
                    <Form.Select 
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Subject</option>
                      {subjects.map((subject, index) => (
                        <option key={index} value={subject}>{subject}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Gender</Form.Label>
                    <div className="d-flex">
                      <Form.Check
                        type="checkbox"
                        id="male"
                        name="male"
                        label="Male"
                        className="me-3"
                        checked={formData.gender === 'male'}
                        onChange={handleInputChange}
                      />
                      <Form.Check
                        type="checkbox"
                        id="female"
                        name="female"
                        label="Female"
                        checked={formData.gender === 'female'}
                        onChange={handleInputChange}
                      />
                    </div>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Photo</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      required={!formData.photo}
                    />
                  </Form.Group>
                </Col>
              </Row>

              {formData.photo && (
                <Row className="mb-3">
                  <Col md={12}>
                    <div className="d-flex justify-content-center">
                      <img
                        src={formData.photo}
                        alt="Preview"
                        className="img-thumbnail"
                        style={{ height: '150px', width: 'auto' }}
                      />
                    </div>
                  </Col>
                </Row>
              )}

              <div className="d-grid">
                <Button variant="primary" type="submit" size="lg">
                  Submit
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      ) : (
        <div>
          <div className="d-flex justify-content-between mb-4 align-items-center">
            <h2>Student Dashboard</h2>
            <Button variant="primary" onClick={() => setShowDashboard(false)}>
              Add New Student
            </Button>
          </div>
          
          {students.length > 0 ? (
            <Card className="shadow-sm">
              <Card.Body>
                <Table responsive hover>
                  <thead className="table-primary">
                    <tr>
                      <th>Photo</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Gender</th>
                      <th>Subject</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.id}>
                        <td>
                          <img
                            src={student.photo}
                            alt={student.name}
                            className="rounded-circle"
                            style={{ width: '50px', height: '50px', cursor: 'pointer', objectFit: 'cover' }}
                            onClick={() => handleImagePreview(student.photo)}
                          />
                        </td>
                        <td>{student.name}</td>
                        <td>{student.email}</td>
                        <td>{student.phone}</td>
                        <td>{student.gender}</td>
                        <td>{student.subject}</td>
                        <td>
                          <Button variant="outline-info" size="sm" className="me-2" onClick={() => handleEdit(student)}>
                            Edit
                          </Button>
                          <Button variant="outline-danger" size="sm" onClick={() => handleDelete(student.id)}>
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          ) : (
            <div className="text-center p-5 bg-light rounded">
              <h4>No students registered yet</h4>
            </div>
          )}
        </div>
      )}

     
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} centered>
        <Modal.Header closeButton className="bg-success text-white">
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '3rem' }}></i>
            <h4 className="mt-3">Registration Successful!</h4>
            <p>Student has been registered successfully.</p>
            <p><strong>Token:</strong> {token}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => setShowSuccessModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Image Preview Modal */}
      <Modal show={showImagePreview} onHide={() => setShowImagePreview(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Photo Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <img
            src={selectedImage}
            alt="Full size preview"
            className="img-fluid"
            style={{ maxHeight: '70vh' }}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default App;