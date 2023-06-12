import React, { useState } from "react";
import { Typography, Row, Col, Button, Modal, Tabs } from "antd";
import SignUpForm from "../components/SignupForm";
import LoginForm from "../components/LoginForm";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
const { Title } = Typography;
const { TabPane } = Tabs;

const Intro = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Row justify="center" className="bg" align="middle" style={{ height: "100vh", color: "#fff", textAlign: "center" }}>
        <Col>
          <Title level={1} className="pageheader" style={{ color: "#fff", textAlign: "center", width: "auto", marginLeft:'10px', marginRight: '10px' }}>
            {Auth.loggedIn() ? "Now that you have an account," : "Hey there, welcome to Recall Rumble!"}
          </Title>
          <img src={logo} alt="Logo" className='logo' style={{ width: "45%", maxWidth: "300px", marginTop:'10px', marginBottom:'20px', marginLeft: 'auto', marginRight: 'auto' }} />
          <Title level={1} className="pageheader" style={{ color: "#fff", textAlign: "center", width: "auto", marginLeft:'10px', marginRight: '10px' }}>
            {Auth.loggedIn() ? "Press the button below to play!" : "Click the button below to login or to make an account!"}
          </Title>
          {Auth.loggedIn() ? (
            <Link to="/Game">
              <Button className="pageheader" size="large" type="primary" style={{ justifyContent: "center", marginTop: "1rem" }}>
                Recall Rumble Time!
              </Button>
            </Link>
          ) : (
            <Button className="pageheader" size="large" type="primary" onClick={() => setShowModal(true)} style={{ justifyContent: "center", marginTop: "1rem", marginBottom: '15px' }}>
              Login / Sign Up
            </Button>
          )}
        </Col>
      </Row>
      <Modal centered open={showModal} onCancel={() => setShowModal(false)} footer={null}>
        <Tabs defaultActiveKey="login" centered>
          <TabPane tab="Login" key="login">
            <LoginForm handleModalClose={() => setShowModal(false)} />
          </TabPane>
          <TabPane tab="Sign Up" key="signup">
            <SignUpForm handleModalClose={() => setShowModal(false)} />
          </TabPane>
        </Tabs>
      </Modal>
    </>
  );
};

export default Intro;
