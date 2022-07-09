import React from "react";
import { Page } from "../components";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";

export default function ProjectPage() {
    let { project } = useParams();

    return (
        <Project project={project} />
    )
}

class Project extends React.Component {
    constructor(props) {
        super(props);
        this.server = process.env.REACT_APP_DEPLOY
                ? process.env.REACT_APP_HEROKU_SERVER : process.env.REACT_APP_LOCAL_SERVER;
        this.project = props.project;
        this.state = {
            future: "",
            now: "",
            past: ""
        }
    }

    componentDidMount() {
        if (this.project === "index") {
            fetch(`${this.server}/projects`)
                .then(result => result.json())
                .then(data => {
                    this.setState({
                        future:data.future,
                        now: data.now,
                        past: data.past
                    });
                })
        }
    }

    render() {
        return (
            this.project === "index"
                ? <Container className="row g-3 m-auto">
                    <h1>FUTURE</h1><hr />
                    {Object.keys(this.state.future).length
                        ? this.state.future.map((event) => {
                            return <Page key={event} collection="projects" name={event} isCard={true} />
                        })
                        : <p className="text-center"><i>Great ideas to be found!</i></p>
                    }
                    <h1 className="pt-5">NOW</h1><hr />
                    {Object.keys(this.state.now).length
                        ? this.state.now.map((event) => {
                            return <Page key={event} collection="projects" name={event} isCard={true} />
                        })
                        : <p className="text-center"><i>I am on holiday!</i></p>
                    }
                    <h1 className="pt-5">PAST</h1><hr />
                    {Object.keys(this.state.past).length
                        ? this.state.past.map((event) => {
                            return <Page key={event} collection="projects" name={event} isCard={true} />
                        })
                        : <p className="text-center pb-5"><i>Newbie onboard!</i></p>
                    }
                </Container>
                : <Container>
                    <Page collection="projects" name={this.project} />
                    <a href="javascript: history.go(-1)"><input type="button" value="Back"/></a>
                </Container>
        )
    }
}