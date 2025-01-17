import './styles.css';


const AssemblyEndgame = () => {



    return (
        <section className="assembly-container">
            <div className='assembly-title'>
                <h2>Assembly: Endgame</h2>
                <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
            </div>
            <div className='assembly-game-status'>
                <h2>You win!</h2>
                <p>Well done! 🎉</p>
            </div>
            <div className='assembly-lang-tiles'>                
            </div>
            <div className='assembly-guess-tiles'>
                array of 8 boxes (grid)
            </div>
            <div className='assembly-keyboard'>
                keyboard with individual key components
            </div>
            <div className='assembly-new-game'>
                New Game button
            </div>
        </section>
        
    )
}

export default AssemblyEndgame;