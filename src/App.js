import React, { useState, useMemo } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  ListGroupItem,
  Input,
} from 'reactstrap';
import IconButton from '@mui/material/IconButton';
import ArrowRight from '@mui/icons-material/ArrowRight';
import ArrowLeft from '@mui/icons-material/ArrowLeft';

const stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];

/**
 * makeCards
 * creating cards
 */
const makeCards = (tasksList) => {
  const makeTasks = Array.from(stagesNames, () => []);

  for (let task of tasksList) {
    const stageId = task.stage;
    makeTasks[stageId].push(task);
  }

  return makeTasks;
};

const moveOrBack = (prevState, task, action) => {
  const { name, stage } = task;

  const index = [...prevState].indexOf(task);
  const newState = [
    ...prevState.slice(0, index),
    ...prevState.slice(index + 1),
  ];

  return [...newState, { name, stage: action === 1 ? stage - 1 : stage + 1 }];
};

export default function App() {
  const [tasksList, setTaskList] = useState([
    { name: 'one', stage: 0 },
    { name: 'two', stage: 0 },
  ]);

  const tasksLits = useMemo(() => makeCards(tasksList), [tasksList]);

  const moveBack = (task) => (event) => {
    setTaskList((prevState) => moveOrBack(prevState, task, 1));
  };

  const moveForward = (task) => (event) => {
    setTaskList((prevState) => moveOrBack(prevState, task, 3));
  };

  return (
    <Container fluid>
      <Row>
        {tasksLits.map((tasks, i) => {
          return (
            <Col xs="12" sm="3" md="3" key={i}>
              <Card className="my-2" outline>
                <CardBody>
                  <CardTitle tag="h5">{stagesNames[i]}</CardTitle>
                  <ListGroup>
                    {tasks.map((task, index) => {
                      return (
                        <ListGroupItem key={index}>
                          {task.name}
                          <IconButton
                            aria-label="delete"
                            onClick={moveBack(task, i, index)}
                            disabled={task.stage === 0}
                          >
                            <ArrowLeft />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            onClick={moveForward(task, i, index)}
                            disabled={task.stage === 3}
                          >
                            <ArrowRight />
                          </IconButton>
                        </ListGroupItem>
                      );
                    })}
                  </ListGroup>
                </CardBody>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
