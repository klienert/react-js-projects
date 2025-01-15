
const Main = () => {

    return (
        <aside className="meme-gen-main">
            <div className="meme-gen-form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder="One does not simply"
                        name="topText"
                    />
                </label>
                <label>Bottom Text
                    <input
                        type="text"
                        placeholder="Walk into Mordor"
                        name="bottomText"
                    />
                </label>
                <button>Get a new meme image 🖼</button>
            </div>
            <div className="meme-gen-meme">
                <img src="http://i.imgflip.com/1bij.jpg" alt="meme image" />
                <span className="top">One does not simply</span>
                <span className="bottom">walk into mordor</span>
            </div>
        </aside>
    )
}

export default Main;