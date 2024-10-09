import React, { useState } from 'react';
import { Container, Row, Col, ListGroup, Tab, Form, Button } from 'react-bootstrap';
import todoItems from '../todoItems';

const TodoList = () => {
    const [items, setItems] = useState(todoItems);
    
    const getColor = (dueDate) => {
        const now = new Date();
        const due = new Date(dueDate);
        const daysLeft = (due - now) / (1000 * 60 * 60 * 24);
        
        if (daysLeft > 7) return 'primary';
        if (daysLeft >= 4) return 'success';
        if (daysLeft >= 2) return 'warning';
        return 'danger';
    };

    return (
        <Container>
            <h1>Assignment 2: Thrilok's ToDo List</h1>
            <Row>
                <Col md={4}>
                    <ListGroup>
                        <Tab.Container defaultActiveKey={items[0].title}>
                            {items.map((item, index) => (
                                <ListGroup.Item
                                    key={index}
                                    variant={getColor(item.dueDate)}
                                    action
                                    href={`#${item.title}`}
                                    eventKey={item.title}
                                >
                                    {item.title}
                                </ListGroup.Item>
                            ))}
                        </Tab.Container>
                    </ListGroup>
                </Col>
                <Col md={8}>
                    <Tab.Content>
                        {items.map((item, index) => (
                            <Tab.Pane eventKey={item.title} key={index}>
                                <h4>Description</h4>
                                <div
                                    contentEditable
                                    suppressContentEditableWarning
                                >
                                    {item.description}
                                </div>
                                <h4>Due Date</h4>
                                <input
                                    type="date"
                                    value={item.dueDate}
                                    onChange={(e) => {
                                        const newItems = [...items];
                                        newItems[index].dueDate = e.target.value;
                                        setItems(newItems);
                                    }}
                                />
                            </Tab.Pane>
                        ))}
                    </Tab.Content>
                </Col>
            </Row>
            <Form>
                <Form.Group controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter title" />
                </Form.Group>
                <Form.Group controlId="formDueDate">
                    <Form.Label>Due Date</Form.Label>
                    <Form.Control type="date" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add ToDo
                </Button>
            </Form>
        </Container>
    );
};

export default TodoList;
