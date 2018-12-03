import React from 'react';
import './loader.css';

/**
 * @param {Array} props.optionsList Array of objects. Each object will have the following structure: {name: 'text in combo', value: 'value when selected'}
 */

function SelectComponent(props) {
        
    let optionsList = [];
    
    if(props.null){
        optionsList.push(<option value={null} key={null}>{props.null}</option>)
    }

    props.options.forEach(option => {
        optionsList.push(
            <option value={option.value} key={option.value}>{option.name}</option>
        )
    });

    return <select id={props.id} className="selectpicker">
        {optionsList}
    </select>;

}

export default SelectComponent;