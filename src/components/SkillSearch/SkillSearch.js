import React from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SkillFilter from "./SkillFilter/SkillFilter";

export default class SkillSearch extends React.Component {
    constructor(props) {
        super(props);
        this.server = process.env.REACT_APP_DEPLOY
            ? process.env.REACT_APP_HEROKU_SERVER : process.env.REACT_APP_LOCAL_SERVER;
        this.state = {
            search: "",
            filter: ""
        }
    }

    componentDidMount() {
        this.handleSubmit();
    }

    collectFillterItem = (result) => {
        this.setState({ filter: result });
    }

    handleSearchChange = (event) => {
        this.setState({ search: event.target.value.toLocaleLowerCase().replace(/ /g, '') });
    }

    handleSubmit = () => {
        fetch(`${this.server}/skillSearch?item=${this.state.search}&filters=${this.state.filter}`)
            .then(response => response.json())
            //the returned search data need to be rechecked
            .then(result => {
                this.props.returnSearchResult(result);
            })
            .catch(error => alert(error));
    }

    render() {
        return (
            <Row className="justify-content-center">
                <Col md={5}>
                    <Form.Control type="text" placeholder="Search Skills. E.g: React" onChange={this.handleSearchChange} />
                </Col>
                <Col className="col-md-auto">
                    <Button type="submit"
                        onClick={e => { e.preventDefault(); this.handleSubmit() }}>
                        Search</Button>
                </Col>
                <Col className="col-md-auto">
                    <SkillFilter collector={this.collectFillterItem} />
                </Col>
            </Row>
        )
    }
}