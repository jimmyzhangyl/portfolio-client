
export default function Footer() {
    const LinkedIn = "https://www.linkedin.com/in/yuanlong-zhang";
    return (
        <footer className="bg-light relative m-1 text-center nav-font">
            <h5>Find me on:&nbsp;
                <a href={LinkedIn} target="_blank" rel="noreferrer">
                    <img class="pb-1 pt-1" width="20" src={require("../../img/LinkedIn.png")} alt="LinkedIn" />
                </a>
            </h5>
        </footer >

    )
}