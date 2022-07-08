import React from "react";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/esm/Container";

export default class SkillFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttons: [],
            filter: [],
            showFilter: false
        }
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    componentDidMount() {
        var tagList = this.state.buttons;
        fetch(`http://localhost:3000/skillSearch/tags`)
            .then(res => res.json())
            .then(data => {
                data.tags.forEach(tag => {
                    tagList[tag] = false;
                });
                this.setState({ buttons: tagList })
            });
    }

    handleButtonClick = (buttonID) => {
        //updating filter, only includes triggered button
        const filterAry = this.state.filter;
        if (this.state.filter.includes(buttonID)) {
            var index = filterAry.indexOf(buttonID);
            filterAry.splice(index, 1);
        } else {
            filterAry.push(buttonID);
        }
        this.setState({ filterAry });
        this.props.collector(this.state.filter);
    }

    handleClose = () => this.setState({ showFilter: false });
    handleShow = () => this.setState({ showFilter: true });

    render() {
        return (
            <>
                <Button variant="primary" onClick={this.handleShow}>
                    Filter
                </Button>

                <Offcanvas show={this.state.showFilter} onHide={this.handleClose}
                    placement={'top'} >
                    <Offcanvas.Body className="ps-5 pt-3">
                        <h3>Skill Tags</h3>
                        <p className="text-muted">Only skills <strong>match all</strong> tags will show.</p>
                        <hr />
                        <Container className="row">
                            {Object.keys(this.state.buttons).length
                                ? Object.keys(this.state.buttons).map(tag => {
                                    return (
                                        <>
                                            <label key={tag} className="ms-2 col-auto p-2">
                                                <input type="checkbox"
                                                    checked={this.state.filter.includes(tag)}
                                                    onChange={() => { this.handleButtonClick(tag) }} />
                                                {tag}
                                            </label>
                                        </>
                                    )
                                })
                                : ""
                            }
                        </Container>
                    </Offcanvas.Body>
                </Offcanvas>
            </>
        );
    }

}