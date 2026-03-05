import React from "react"

const ReviewMaps = () => {

        /*
        Challenge 1:
        Given an array of numbers, return an array of each number, squared
        */
        const nums = [1, 2, 3, 4, 5]
        // -->       [1, 4, 9, 16, 25]
        // Your code here
        // console.log(nums);
        const map1 = nums.map((x) => x * x);
        // console.log(map1);

        /*
        Challenge 2:
        Given an array of strings, return an array where 
        the first letter of each string is capitalized
        */

        const names = ["alice", "bob", "charlie", "danielle"]
        // -->        ["Alice", "Bob", "Charlie", "Danielle"]
        // Your code here
        // console.log(names);
        const map2 = names.map((x) => x = x.charAt(0).toUpperCase() + x.slice(1));
        // console.log(map2);


        /*
        Challenge 3:
        Given an array of strings, return an array of strings that wraps each
        of the original strings in an HTML-like <p></p> tag.

        E.g. given: ["Bulbasaur", "Charmander", "Squirtle"]
        return: ["<p>Bulbasaur</p>", "<p>Charmander</p>", "<p>Squirtle</p>"]
        */

        const pokemon = ["Bulbasaur", "Charmander", "Squirtle"]
        // -->          ["<p>Bulbasaur</p>", "<p>Charmander</p>", "<p>Squirtle</p>"]
        // Your code here

        const map3 = pokemon.map((x) => x = `<p>${x}</p>`);
        console.log(map3);


    return (
        <>
        Test Review Maps Component
        </>
    )


}

export default ReviewMaps;
