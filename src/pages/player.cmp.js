import React, { Component}                          from 'react';
import PlayButton                                   from '../playButton/playButton.cmp'
import { OurFirstComponent, OurSecondComponent }    from '../playButton/test.cmp'
import LoadFileComponent                            from '../components/loadFile.cmp'

class PlayerComponent extends Component {
    
    state = { isMusicPlaying: false };

    handleClick(event) {            //Called in HTML using    onClick={this.handleClick.bind(this)}
        console.log('EVENT: ', event)

        //Change current state
        this.setState(prevState => {        //To use the previous state, we don't pass an object as argument of setState(). Instead, we use a function whose argument is the previous state
            return {
                isMusicPlaying: !prevState.isMusicPlaying
            };
        });
        
        //Play and pause audio
        if (this.state.isMusicPlaying) {
            this.audio.pause();     //audio was added to "this" by the "ref" attribute in the <audio> tag in DOM
        } else {
            this.audio.play();
        }

    };
        
    render() {
        
        //Basic variables and functions
        function add(first, second){
            return first + second;
        }
        let num1 = 5;
        let num2 = 3;

        //Status linked to component's state
        const status = this.state.isMusicPlaying ? 'Playing' : 'Not playing';

        return (
            <div>
                <h1>Class Container</h1>
                <p>Adding: { num1 } + { num2 } = { add(num1, num2) }</p>
                <OurFirstComponent />
                <OurSecondComponent />
                <PlayButton isMusicPlaying={this.state.isMusicPlaying} clickFunction={this.handleClick.bind(this)} />   {/* isMusicPlaying is sent as a prop (similar to angular component's bindings) */}
                <h2 onClick={this.handleClick.bind(this)}> { status } </h2>
                <audio id="audio" ref={(audioTag) => { this.audio = audioTag }} /> {/* Ref attribute executes a function whose argument is the tag where it is placed, so we can link it in the component "this"*/}
                <LoadFileComponent />
            </div>
        );
    }
}

export default PlayerComponent;