import mailIcon from './images/envelope-fill.svg';
import phoneIcon from './images/telephone-fill.svg';

export default function Contact( {img, name, phone, email} ) {
    // console.log(props);
    

    return (
        <article className="contact-card">
            <img
                src={img}
                alt={name}
            />
            <h3>{name}</h3>
            <div className="info-group">
                <img
                    src={phoneIcon}
                    alt="phone icon"
                />
                <p>{phone}</p>
            </div>
            <div className="info-group">
                <img
                    src={mailIcon}
                    alt="mail icon"
                />
                <p>{email}</p>
            </div>
        </article>
    )
}