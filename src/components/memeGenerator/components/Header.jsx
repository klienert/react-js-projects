import smiley from "../images/emoji-smile-upside-down.svg";
import smileyFill from "../images/emoji-smile-upside-down-fill.svg";


const Header = () => {

    return (
        <header className="meme-gen-header">
            <img className="meme-gen-header-icon"
                src={smiley}
                alt="Smiley Face"
            />
            <h1>Meme Generator</h1>
        </header>
    )
}

export default Header;