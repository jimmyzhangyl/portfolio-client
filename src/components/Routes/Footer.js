
export default function Footer() {
    const LinkedIn = "https://www.linkedin.com/in/yuanlong-zhang";
    const GitHub = "https://github.com/jimmyzhangyl"; 
    return (
        <footer className="bg-light relative m-1 text-center nav-font">
            <h5>Find me on:&nbsp;
                <a href={LinkedIn} target="_blank" rel="noreferrer">
                    <img class="py-1 mx-3" width="25px" src={require("../../img/LinkedIn.png")} alt="LinkedIn" />
                </a>
                <a href={GitHub} target="_blank" rel="noreferrer">
                    <img class="py-1 mx-3" width="25px" src={require("../../img/GitHub.png")} alt="LinkedIn" />
                </a>
            </h5>
        </footer >

    )
}