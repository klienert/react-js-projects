import React from "react";
import "./styles.css";
import Header from "./components/Header";
import Main from "./components/Main";
import OnClickPractice from "./components/OnClickPractice";
import State1 from "./components/State1";
import State2 from "./components/State2";
import TernaryPractice from "./components/TernaryPractice";
import State3 from "./components/State3";
import ComplexStateObj from "./components/ObjPractice1";
import Form1 from "./components/Form1";
import SoundPads from "./components/SoundPad";


const ChefClaude = () => {

    return (
        <section className="chef-claude">
            <Header />
            <Main />
            {/* <OnClickPractice /> */}
            {/* <State1 /> */}
            {/* <State2 /> */}
            {/* <TernaryPractice /> */}
            {/* <State3 /> */}
            {/* <ComplexStateObj /> */}
            {/* <Form1 /> */}
            {/* <SoundPads darkMode={true}/> */}
        </section>
    )
}

export default ChefClaude;