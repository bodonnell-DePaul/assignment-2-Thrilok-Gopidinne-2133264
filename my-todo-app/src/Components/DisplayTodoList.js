import React, { useState } from 'react';
import { Container, Row, Col, ListGroup, Tab, Form, Button } from 'react-bootstrap';
import todos from '../todoItems';

import '../DisplayTodoList.css'; // Import the CSS file

const DisplayTodoList = () => {
    const [items, setItems] = useState(todos);
    const [listIndex, setListIndex] = useState(0);
    const [newTitle, setNewTitle] = useState('');
    const [newDueDate, setNewDueDate] = useState('');

    const getColor = (dueDate) => {
        const now = new Date();
        const due = new Date(dueDate);
        const daysLeft = (due - now) / (1000 * 60 * 60 * 24);

        if (daysLeft > 7) return 'primary';
        if (daysLeft >= 4) return 'success';
        if (daysLeft >= 2) return 'warning';
        return 'danger';
    };

    const handleAddTodo = (e) => {
        e.preventDefault();

        if (newTitle && newDueDate) {
            const newItem = {
                title: newTitle,
                description: 'No description',
                dueDate: newDueDate,
            };

            setItems([...items, newItem]);
            setNewTitle('');
            setNewDueDate('');
        }
    };

    return (
        <Container>
            <h1>Assignment 2: Thrilok's ToDo List</h1>
            <Tab.Container defaultActiveKey={items[0]?.title}>
                <Row className="main_row ">

                    <Col md={3} mb={3} className='add-form mb-3'>
                        <Form onSubmit={handleAddTodo}>
                            <Form.Group controlId="formTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Add todo item"
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="formDueDate ">
                                <Form.Label>Due Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={newDueDate}
                                    onChange={(e) => setNewDueDate(e.target.value)}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Add ToDo
                            </Button>
                        </Form>
                    </Col>
                    <Col md={4}>
                        <ListGroup>
                            {items.map((item, index) => (
                                <ListGroup.Item
                                    key={index}
                                    variant={getColor(item.dueDate)}
                                    action
                                    href={`#${item.title}`}
                                    eventKey={item.title}
                                    onClick={() => setListIndex(index)}
                                >
                                    {item.title}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>

                    <Col md={5}>
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
                                            newItems[listIndex].dueDate = e.target.value;
                                            setItems(newItems);
                                        }}
                                    />
                                </Tab.Pane>
                            ))}
                        </Tab.Content>
                    </Col>


                </Row>
            </Tab.Container>
        </Container>
    );
};

export default DisplayTodoList;
