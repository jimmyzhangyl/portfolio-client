import React from "react";
import ReactMarkdown from 'react-markdown';
import Container from "react-bootstrap/esm/Container";
import Accordion from "react-bootstrap/esm/Accordion";

export default class Timeline extends React.Component {
    constructor() {
        super();
        this.server = process.env.REACT_APP_DEPLOY
            ? process.env.REACT_APP_HEROKU_SERVER : process.env.REACT_APP_LOCAL_SERVER;
        this.state = {
            timelines: {}
        }
    }

    componentDidMount() {
        fetch(`${this.server}/timeline`)
            .then(res => res.json())
            .then(data => {
                var result = this.state.timelines;
                result = data;
                this.setState({ timelines: result });
            })
    }


    render() {
        var count = 0;
        return (
            <Container >
                <div className="">
                    <h1 >TIMELINE</h1>
                    <h5 className="text-muted "
                    ><i>Gratefully, we arrived here</i></h5>
                    <hr />
                </div>
                <ul className="timeline">
                    {Object.keys(this.state.timelines).length
                        ? this.state.timelines.map((timeline) => {
                            return <li key={timeline.timeline_name}
                                class={count++ % 2 ? "timeline-inverted" : ""} >
                                <div className="timeline-image">
                                    <img className="rounded-circle img-fluid rect-img m-auto"
                                        alt="..."
                                        src={require(`../../img/timeLine/${timeline.timeline_img}`)}
                                    />
                                </div>
                                <div className="timeline-panel">
                                    <div className="timeline-heading">
                                        <h4>{timeline.timeline_time_start}-{timeline.timeline_time_end}</h4>
                                    </div><hr />
                                    <Accordion
                                        defaultActiveKey="0"
                                        className="timeline-body">
                                        <Accordion.Item >
                                            <Accordion.Header ><h3>{timeline.timeline_name}</h3></Accordion.Header>
                                            <Accordion.Body>
                                                <ReactMarkdown className="text-muted">{timeline.timeline_event}</ReactMarkdown>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </div>
                            </li>
                        })
                        : <h1>Loading...</h1>}
                </ul>
            </Container>
        )
    }
}