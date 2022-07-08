import React from "react";
import Container from "react-bootstrap/esm/Container";
import { SkillSearch, Page } from "../components";
export default class Skills extends React.Component {
    constructor() {
        super();
        this.state = {
            searchResult: ""
        }
    }

    collectSearchResult = (result) => {
        this.setState({ searchResult: result });
    }

    render() {
        return (
            <Container>
                <Container fulid className="pt-5 pb-5 search-bar" >
                    <SkillSearch returnSearchResult={this.collectSearchResult} tags={['web', 'java-script']} />
                </Container>
                {Object.keys(this.state.searchResult).length
                    ? <Container fulid className="pt-4 pb-4 row justify-content-center">
                        <h2>Skill Cards</h2>
                        <hr />
                        {Object.keys(this.state.searchResult.skills).length
                            ? this.state.searchResult.skills.map(skill => {
                                return <Page key={skill} collection="skills" name={skill} />
                            })
                            : <i className="text-center"
                                style={{ 'font-weight': 'bold' }}>
                                :/ No known skill matches all your criteria!</i>}

                        <h2 className="pt-5">Project Cards</h2>
                        <hr />
                        {Object.keys(this.state.searchResult.projects).length
                            ? this.state.searchResult.projects.map(skill => <Page key={skill} collection="projects" name={skill} isCard={true} />)
                            : <i className="text-center"
                                style={{ 'font-weight': 'bold' }}>
                                :/ No Projects found can well demo the above skills!</i>}
                    </Container>
                    : <p className="text-center"
                        style={{ 'font-weight': 'bold', 'font-style': 'italic' }}>
                        Hi, Start searching to see what I know!</p>}
            </Container>
        )
    }
} 