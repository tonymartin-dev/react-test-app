import React, { Component} from 'react';

class PlayButton extends Component {
    render() {
    
        // Destructure props for readability
        const {
            isMusicPlaying,
            clickFunction
        } = this.props

        let className = isMusicPlaying ? 'play active' : 'play';
        
        return <button title="Play video" className={ className } onClick={ clickFunction }></button>;   //Click function can also be taken directly from props (props.clickFunction)
    }
};

export default PlayButton;