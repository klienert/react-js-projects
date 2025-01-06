import mailIcon from './images/envelope-fill.svg';
import phoneIcon from './images/telephone-fill.svg';

export default function Contact(props) {
    // console.log(props);
    

    return (
        <article className="contact-card">
            <img
                src={props.img}
                alt="Photo of Mr. Whiskerson"
            />
            <h3>{props.name}</h3>
            <div className="info-group">
                <img
                    src={phoneIcon}
                    alt="phone icon"
                />
                <p>{props.phone}</p>
            </div>
            <div className="info-group">
                <img
                    src={mailIcon}
                    alt="mail icon"
                />
                <p>{props.email}</p>
            </div>
        </article>
    )
}

const person = {
    img: "some image",
    name: "Mr. Whiskerson"
};

const {img, name} = person;
console.log(name);