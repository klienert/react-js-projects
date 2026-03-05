import Contact from "./Contact"
import './index.css';
import cat1 from './images/cat1.jpg';
import cat2 from './images/cat2.jpg';
import cat3 from './images/cat3.jpg';
import cat4 from './images/cat4.jpg';

function Contacts() {
    return (
        <div className="contacts-container">
            <div className="contacts">
                <Contact 
                    img={cat1}
                    name="Mr. Whiskerson"
                    phone="(212) 555-1234"
                    email="mr.whiskaz@catnap.meow"
                />
                <Contact 
                    img={cat2}
                    name="Fluffykins"
                    phone="(212) 555-2345"
                    email="fluff@me.com"
                />
                <Contact 
                    img={cat3}
                    name="Felix"
                    phone="(212) 555-4567"
                    email="thecat@hotmail.com"
                />
                <Contact 
                    img={cat4}
                    name="Pumpkin"
                    phone="(800) CAT-KING"
                    email="pumpkin@scrimba.com"
                />
            </div>            
        </div>
    )
}

export default Contacts