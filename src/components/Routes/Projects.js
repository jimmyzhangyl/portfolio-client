import {Outlet} from "react-router-dom";

export default function Projects() {
    return (
        <div>
            <h1 className="text-center pt-2">PROJECTS</h1>
            <hr/>
            <Outlet/>
        </div>

    )
}