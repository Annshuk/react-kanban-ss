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
import { ArrowRigh, ArrowLeft, Delete } from '@mui/icons-material';

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

/**
 * remove item
 */
const remove = (arr, index) => [
  ...arr.slice(0, index),
  ...arr.slice(index + 1),
];

/**
 * moveForwardOrBack
 * move forward or back on button click
 */
const moveForwardOrBack = (tasks, task, action) => {
  const { name, stage } = task;

  const taskIndex = [...tasks].indexOf(task);
  const newState = remove(tasks, taskIndex);

  return [...newState, { name, stage: action === 1 ? stage - 1 : stage + 1 }];
};

export default function App() {
  const [tasksList, setTaskList] = useState([
    { name: 'one', stage: 0 },
    { name: 'two', stage: 0 },
  ]);

  const tasksLits = useMemo(() => makeCards(tasksList), [tasksList]);

  const moveBack = (task) => {
    setTaskList((prevState) => moveForwardOrBack(prevState, task, 1));
  };

  const moveForward = (task) => {
    setTaskList((prevState) => moveForwardOrBack(prevState, task, 3));
  };

  const removeTask = (task) => {
    setTaskList((prevState) => {
      const taskIndex = [...prevState].indexOf(task);

      return remove(prevState, taskIndex);
    });
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
                            onClick={() => moveBack(task)}
                            disabled={task.stage === 0}
                          >
                            <ArrowLeft />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            onClick={() => moveForward(task)}
                            disabled={task.stage === 3}
                          >
                            <ArrowRight />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            onClick={() => removeTask(task)}
                          >
                            <Delete />
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
