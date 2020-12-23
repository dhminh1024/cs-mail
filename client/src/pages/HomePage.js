import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import authActions from "../redux/actions/auth.actions";
import Moment from "react-moment";
import MessageModal from "../components/MessageModal";

const HomePage = () => {
  const [formData, setFormData] = useState({
    to: "",
    title: "",
    content: "",
  });
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const currentUser = useSelector((state) => state.auth.user);
  const messages = useSelector((state) => state.auth.messages);
  const loading = useSelector((state) => state.auth.loading);
  const [showModal, setShowModal] = useState(false);
  const [selectedMsg, setSelectedMsg] = useState(null);

  const currentUserId = currentUser._id;

  const handleSubmit = (e) => {
    e.preventDefault();
    const { to, title, content } = formData;
    if (currentUserId)
      dispatch(
        authActions.sendMessage({
          from: currentUserId,
          to,
          title,
          body: content,
        })
      );
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleClickMsg = (message) => {
    setShowModal(true);
    setSelectedMsg(message);
    message.status = "seen";
    dispatch(authActions.updateMessage({ message, currentUserId }));
  };

  useEffect(() => {
    if (currentUserId) dispatch(authActions.getReceivedMessages(currentUserId));
  }, [dispatch, currentUserId]);

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                type="email"
                required
                placeholder="Receiver"
                name="to"
                value={formData.to}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Content"
                name="content"
                value={formData.content}
                onChange={handleChange}
              />
            </Form.Group>

            {loading ? (
              <Button
                className="btn-block"
                variant="primary"
                type="button"
                disabled
              >
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Loading...
              </Button>
            ) : (
              <Button className="btn-block" type="submit" variant="primary">
                Submit
              </Button>
            )}
          </Form>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>From</th>
                <th>To</th>
                <th>Title</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((message, index) => (
                <tr
                  key={message._id}
                  onClick={() => handleClickMsg(message)}
                  className={
                    message.status === "seen" ? "" : "font-weight-bold"
                  }
                >
                  <td>{index + 1}</td>
                  <td>{message.from?.email}</td>
                  <td>{message.to?.email}</td>
                  <td>{message.title}</td>
                  <td>
                    <Moment fromNow>{message.createdAt}</Moment>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <MessageModal
            showModal={showModal}
            setShowModal={setShowModal}
            message={selectedMsg}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
