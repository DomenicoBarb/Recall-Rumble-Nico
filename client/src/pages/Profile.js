import React from 'react';
import { Typography, Row, Col, Button } from 'antd';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { DELETE_SCORES } from '../utils/mutations';

const { Title } = Typography;

const Profile = () => {
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || {};
  let highscore = ""
  let lastscore = ""
  const [deleteScores, {error}] = useMutation(DELETE_SCORES)

  if(userData.highScore === 99) {
    highscore = "N/A"
    lastscore = "N/A"
  } else {
    highscore = userData.highScore
    lastscore = userData.lastScore
  }

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  const DeleteScoreHandler = async () => {
    try {
      await deleteScores({
        variables: {
          player: userData._id
        }
      })
      window.location.reload(true)
    } catch (err) {
      console.error(JSON.stringify(err))
    }
  }

  return (
    <>
      <Row justify="center" align="middle" style={{ height: '100px', background: '#001529', color: '#fff' }}>
        <Col>
          <Title level={1} style={{ color: '#fff', textAlign: 'center' }}>Profile Page</Title>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: '20px' }}>
        <Col>
          <Title level={2}>Username: {userData.username}</Title>
          <Title level={2}>Email: {userData.email}</Title>
          <Title level={2}>High Score: {highscore}</Title>
          <Title level={2}>Last Score: {lastscore}</Title>
          <Button type='primary' danger onClick={DeleteScoreHandler}>Delete Scores</Button>
        </Col>
      </Row>
    </>
  );
};

export default Profile;
