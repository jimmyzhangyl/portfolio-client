import React from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';

import rehypeRaw from "rehype-raw";

export default class Page extends React.Component {
    constructor(props) {
        super(props);
        this.server = process.env.REACT_APP_DEPLOY
            ? process.env.REACT_APP_HEROKU_SERVER : process.env.REACT_APP_LOCAL_SERVER;
        this.collection = props.collection;
        this.name = props.name;
        this.isCard = props.isCard;
        this.state = {
            page: {
                content: "loading"
            },
            skill: {
                notes: "loading",
                tags: ["loading"]
            },
            project: {
                body: "loading",
                abstract: "loading",
                cover: "loading",
                skills: ["loading"]
            }
        }
    }

    componentDidMount() {
        console.log(`${this.server}/page?collection=${this.collection}&name=${this.name}`);
        fetch(`${this.server}/page?collection=${this.collection}&name=${this.name}`)
            .then(res => res.json())
            .then(data => {
                switch (this.collection) {
                    case "pages":
                        var page = { ...this.state.page };
                        page.content = data.page_content;
                        this.setState({ page });
                        break;
                    case "skills":
                        var skill = { ...this.state.skill };
                        skill.notes = data.skill_notes;
                        skill.tags = data.skill_tags;
                        skill.name = data.skill_name;
                        this.setState({ skill });
                        break;
                    case "projects":
                        var project = { ...this.state.project };
                        project.name = data.project_name;
                        project.abstract = data.project_abstract;
                        project.body = data.project_body;
                        project.skills = data.project_skills;
                        project.cover = data.project_cover;
                        project.start = data.project_start;
                        project.end = data.project_end;
                        this.setState({ project });
                        break;
                    default:
                        throw new Error("Loading page data failed");
                }
            }).catch(err => {
                throw new Error(err);
            });
    }


    //render result vary depends on collection types
    render() {
        switch (this.collection) {
            case "pages":
                return (<ReactMarkdown children={this.state.page.content} rehypePlugins={[rehypeRaw]} />)
            case "skills":
                return (
                    this.getSkillCards()
                )
            case "projects":
                if (this.isCard) {
                    return (
                        this.getProjectCards()
                    )
                } else {
                    return (<ReactMarkdown children={this.state.project.body}
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]} />);
                }
            default:
                return (<div>"Loading Failed Please Try refresh the page"</div>)
        }
    }

    getProjectCards() {
        return <Carousel interval={null} variant="dark"
            className="img-thumbnail container project-card">
            <Carousel.Item>
                <a href={`/projects/${this.state.project.name}`} >
                    <img className="img-fluid bg-project-card"
                        src={this.state.project.cover}
                        alt="Project cover" /></a>
                <Carousel.Caption>
                    <h3 className="text-uppercase">
                        <strong>{this.state.project.name}</strong>
                    </h3>
                    <h5><i>{this.state.project.start}-{this.state.project.end}</i></h5>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item
                className="m-1 img-fluid overflow-auto container">
                <ReactMarkdown
                    children={this.state.project.abstract}
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]} />
                <a href={`/projects/${this.state.project.name}`} ><input type="button" value="Case Study" /></a>
            </Carousel.Item>
        </Carousel>;
    }

    getSkillCards() {
        return <Card style={{ width: '25rem' }}>
            <Card.Title><h1 className="text-uppercase">{this.state.skill.name}</h1><hr /></Card.Title>
            <Card.Body
                style={{ maxHeight: '20rem' }}
                className="overflow-auto">
                <Card.Text>
                    <ReactMarkdown children={this.state.skill.notes}
                        components={{
                            img: ({ node, ...props }) => <img className="img-fluid"
                                style={{ width: '5rem', float: 'right' }} {...props} />
                        }} />
                </Card.Text>
                <Card.Footer className="text-muted row">
                    {this.state.skill.tags.map((tag) => {
                        return <i className="col col-md-auto" key={tag}>#{tag}</i>;
                    })}
                </Card.Footer>
            </Card.Body>
        </Card>;
    }
}



Page.defaultProps = {
    isCard: false
}