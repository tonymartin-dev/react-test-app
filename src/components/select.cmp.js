import React from 'react';
import './loader.css';

/**
 * @param {Array} props.optionsList Array of objects. Each object will have the following structure: {name: 'text in combo', value: 'value when selected'}
 */

function SelectComponent(props) {
        
    let optionsList = [];

    props.options.forEach(option => {
        optionsList.push(
            <option value={option.value} key={option.value}>{option.name}</option>
        )
    });

    return <select id={props.id}>
        {optionsList}
    </select>;

}

export default SelectComponent;