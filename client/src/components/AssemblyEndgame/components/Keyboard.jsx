

const Keyboard = ( {guessedLetter} ) => {

    
    const letters = "abcdefghijklmnopqrstuvwxyz";

    const buttons = letters.split('').map((x, i) => {        
        return (
            <button 
                key={i}
                className="keyboard-key"
                style={
                    {
                        color: '#000',
                        backgroundColor: '#FCBA29'
                    }
                }
            >{x.toUpperCase()}</button>
        )
    })

    return (
        <div className='assembly-keyboard'>
            {buttons}
        </div>
    )
}

export default Keyboard;