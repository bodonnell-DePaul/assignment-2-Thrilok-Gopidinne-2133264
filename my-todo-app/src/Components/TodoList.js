import React, { useState } from 'react';
import { Container, Row, Col, ListGroup, Tab, Form, Button } from 'react-bootstrap';
import todos from '../todoItems';

const TodoList = () => {
    const [items, setItems] = useState(todos);
    const [listIndex, setListIndex] = useState(0);
    const [newTitle, setNewTitle] = useState(''); // Track the new title
    const [newDueDate, setNewDueDate] = useState(''); // Track the new due date

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
                description: 'No description', // Default description for new items
                dueDate: newDueDate,
            };
            
            // Update the items list with the new item
            setItems([...items, newItem]);

            // Clear the form inputs
            setNewTitle('');
            setNewDueDate('');
        }
    };

    return (
        <Container>
            <h1>Assignment 2: ToDo List</h1>
            <Col>
                <Tab.Container defaultActiveKey={items[0].title}>

                    <Row>
                        <Col md={4}>
                            <ListGroup>
                                {items.map((item, index) => (
                                    <ListGroup.Item
                                        key={index}
                                        variant={getColor(item.dueDate)}
                                        action
                                        href={`#${item.title}`}
                                        eventKey={item.title}
                                        onClick={() => setListIndex(index)} // Fixed: wrapped in an arrow function
                                    >
                                        {item.title}
                                    </ListGroup.Item>
                                ))}
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
                    <Form.Group controlId="formDueDate">
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
        </Container>
    );
};

export default TodoList;





