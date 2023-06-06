import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Dropdown, Modal, Tabs } from 'antd';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';

import Auth from '../utils/auth';

const { TabPane } = Tabs;

const AppNavigationBar = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedKey, setSelectedKey] = useState('');
  const location = useLocation();

  useEffect(() => {
    setSelectedKey(location.pathname);
  }, [location.pathname]);

  const handleMenuClick = ({ key }) => {
    if (key === "logout") {
      Auth.logout();
    }
  };

  const handleDifficultyLevel = ({ key }) => {
    window.location.reload()
  };

  const difficultyLevel = (
    <Menu onClick={handleDifficultyLevel} mode="horizontal">
      <Menu.Item key="easy">
      <Link to="/Game/beginner">Easy</Link>
      </Menu.Item>
      <Menu.Item key="medium">
      <Link to="/Game/intermediate">Medium</Link>
      </Menu.Item>
      <Menu.Item key="hard">
      <Link to="/Game/expert">Hard</Link>
      </Menu.Item>
    </Menu>
  );

  // Define the dropdown menu to be used with Ant Design's Dropdown
  const menu = (
    <Menu onClick={handleMenuClick} mode="horizontal">
      {/* <Menu.Item key="game">
        <Link to="/Game/beginner">Game</Link>
      </Menu.Item> */}
      <Menu.Item key="game">
      <Dropdown overlay={difficultyLevel} placement="bottomRight">
              <span
                // style={{
                //   color: "black",
                //   paddingRight: "5px",
                // }}
              >
                Game
              </span>
            </Dropdown>
      </Menu.Item>
      <Menu.Item key="/Profile">
        <Link to="/Profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="/Leaderboard">
        <Link to="/Leaderboard">Leaderboard</Link>
      </Menu.Item>
      <Menu.Item key="/Donate">
        <Link to="/Donate">Donate</Link>
      </Menu.Item>
      <Menu.Item key="logout">Logout</Menu.Item>
    </Menu>
  );

  return (
    <>
      {Auth.loggedIn() && (
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[selectedKey]} style={{ lineHeight: '64px', justifyContent: 'space-between' }}>
          <span key="home" className='pageheader' style={{ fontSize: '20px', padding: '0 15px', cursor: 'default', marginRight: 'auto', color: 'white' }}>Recall Rumble</span>
          <Menu.Item key="dropdown">
            <Dropdown overlay={menu} placement="bottomRight">
              <span className='pageheader' style={{ fontSize: '20px', color: 'white', paddingRight: '5px' }}>Menu</span>
            </Dropdown>
          </Menu.Item>
        </Menu>
      )}

      {!Auth.loggedIn() && (
        <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px', justifyContent: 'space-between' }}>
          <span key="home" className='pageheader' style={{ fontSize: '20px', padding: '0 15px', cursor: 'default', marginRight: 'auto', color: 'white' }}>Recall Rumble</span>
          <Menu.Item className='pageheader' key="login-signup" onClick={() => setShowModal(true)} style={{ color: 'white' }}>
            Login/Sign Up
          </Menu.Item>
        </Menu>
      )}

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

export default AppNavigationBar;
