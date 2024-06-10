import React from "react";
import { Chart } from "react-google-charts";

// sample data
const test = {
    "complete_arr":[
        {
            first_name:'Baggins',
            last_name:'Frodo',
            email: "fbaggins@lotr.com",
            user_id:"317802",
            region:"21",
            district:"1339",
            campus:"11707",
            grade_level:"0",
            job_title:"",
            completed:"2024-06-06 20:12:00",
            total_courses:"3"
        },
        {
            first_name:"Faramir",
            last_name:"Ranger of Ithilien",
            email:"faramir@lotr.com",
            user_id:"317828",
            region:"21",
            district:"1339",
            campus:"11344",
            grade_level:"0",
            job_title:"",
            completed:"2024-06-07 14:37:00",
            total_courses:"3"},
        {
            first_name:"Aragorn",
            last_name:"Strider",
            email:"aragorn@lotr.com",
            user_id:"317808",
            region:"21",
            district:"1339",
            campus:"11344",
            grade_level:"0",
            job_title:"",
            completed:"2024-06-05 20:00:00",
            total_courses:"3"}
        ],
    "incomplete_arr":[
        {
            first_name:"Merry",
            last_name:"Brandybuck",
            email:"mbrandy@lotr.com",
            user_id:"317803",
            region:"21",
            district:"1339",
            campus:"11707",
            grade_level:"0",
            job_title:"",
            completed:null,
            total_courses:"0"
        },
        {
            first_name:"Samwise",
            last_name:"Gamgee",
            email:"sam@lotr.com",
            user_id:"317805",
            region:"21",
            district:"1339",
            campus:"11707",
            grade_level:"0",
            job_title:"",
            completed:"2024-06-06 13:02:00",
            "total_courses":"1"
        },
        {
            first_name:"Gimli",
            last_name:"The Dwarf",
            email:"gimli@lotr.com",
            user_id:"317806",
            region:"21",
            district:"1339",
            campus:"11344",
            grade_level:"0",
            job_title:"",
            completed:null,
            total_courses:"0"
        },
        {
            first_name:"Gandalf",
            last_name:"The Grey",
            email:"gandalf@lotr.com",
            user_id:"317801",
            region:"21",
            district:"1339",
            campus:"11708",
            grade_level:"0",
            job_title:"",
            completed:null,
            total_courses:"0"
        },
        {
            first_name:"Pippin",
            last_name:"Took",
            email:"ptook@lotr.com",
            user_id:"317807",
            region:"21",
            district:"1339",
            campus:"11707",
            grade_level:"0",
            job_title:"",
            completed:null,
            total_courses:"0"
        }
    ]
    ,"planName":"NEW - Multi-Campus Plan TEST"
};

let numComplete = test.complete_arr.length;
let numIncomplete = test.incomplete_arr.length; 
let total = numComplete + numIncomplete;

let testComplete = 1034;
let testIncomplete = 387;
let testTotal = testComplete + testIncomplete;

export const data = [
    // [ X , Y , etc. ]
    ["Completions", "Total", { role: 'annotation' }, { role: 'style'}],
    ['Complete', testComplete,  testComplete, 'green' ],
    ['Incomplete', testIncomplete, testIncomplete, 'red' ]
];

const options = {
    title: "Test Completions Graph",
    isStacked: true
};

const GoogleChart = () => {

    return (
        <Chart 
            chartType="ColumnChart"
            width="50%" 
            height="400px" 
            data={ data } 
            options={ options }
        />
    )
}

export default GoogleChart;