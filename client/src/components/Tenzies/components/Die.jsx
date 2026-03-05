
const Die = ( {value, isHeld, id, hold} ) => {
   
    const styles = {
        backgroundColor: isHeld ? '#59E391' : '#FFF'
    }

    return (
        {isHeld} 
        ?
        <button
            onClick={() => hold(id)}
            style={styles}
            aria-pressed={isHeld}
            aria-label={`Die with the value ${value}, ${isHeld ? 'held' : 'not held'}`}
        >{value}</button>
        :
        <button
        >{value}</button>        
    )
}

export default Die;