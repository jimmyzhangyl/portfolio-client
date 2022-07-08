import React from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import Modal from "react-bootstrap/esm/Modal";


export default class Contact extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            title: '',
            message: '',
            messageSent: false,
            validated: false
        }

    }

    handleNameChange = (event) => {
        this.setState({ name: event.target.value });
    }

    handleEmailChange = (event) => {
        this.setState({ email: event.target.value.replace(/ /g, '') });
    }

    handleTitleChange = (event) => {
        this.setState({ title: event.target.value });
    }

    handleMessageChange = (event) => {
        this.setState({ message: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            //calling API to deep check email 
            fetch(`http://localhost:3000/mailer/check?email=${this.state.email}`)
                .then(res => res.json())
                .then(checkEmail => {
                    if (checkEmail.isValid) {
                        this.setState({ validated: true });
                        this.sendEmail();
                    } else {
                        alert(checkEmail.reason);
                    }
                })
        }
    }

    sendEmail() {
        const contactForm = {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                title: this.state.title,
                message: this.state.message
            })
        };
        fetch('http://localhost:3000/mailer', contactForm)
            // .then(response => response.json())
            .then((res) => {
                if (res.ok) {
                    this.setState({ messageSent: true });
                } else {
                    alert("Unable to Send Message: " + res.status);
                }
            })
    }

    hideModal = () => { this.setState({ messageSent: false }) }

    render() {
        return (
            <>
                <Form className="row img-thumbnail"
                    style={{ maxWidth: '45rem' }}
                    validated={this.state.validated} onSubmit={this.handleSubmit}>
                    <legend>Contact Form</legend>
                    <Form.Group
                        className="col-auto mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            style={{ maxWidth: '15rem' }}
                            type="text" placeholder="Hi~"
                            onChange={this.handleNameChange} required />
                        <Form.Control.Feedback type="invalid">
                            Please provide a name.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group
                        className="col-auto mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            style={{ maxWidth: '22rem' }}
                            type="email" placeholder="I want to get back to you"
                            onChange={this.handleEmailChange} required />
                        <Form.Text className="text-muted">
                            *No promotions or ads.
                        </Form.Text>
                        <Form.Control.Feedback type="invalid">
                            Please use valid email.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                        className="col-auto mb-3">
                        <Form.Label>Message Title</Form.Label>
                        <Form.Control
                            style={{ maxWidth: '22rem' }}
                            type="text" placeholder="If needed"
                            onChange={this.handleTitleChange} />
                    </Form.Group>
                    <Form.Group
                        className="col-12 mb-3">
                        <Form.Label>Message</Form.Label>
                        <textarea
                            style={{ height: '10rem' }}
                            class="form-control"
                            onChange={this.handleMessageChange} required />
                        <Form.Control.Feedback type="invalid">
                            Please enter the message.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Send
                    </Button>
                </Form >

                <Modal
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={this.state.messageSent} onHide={this.hideModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Message Sent!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><strong><i>
                        Thank you for contacting. I'll get back to you ASAP!
                    </i></strong></Modal.Body>
                </Modal>
            </>
        )
    }

}