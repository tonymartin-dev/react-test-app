import React from 'react';

function LoadFileComponent() {
     
    return <div id="player">
        <input type="file" id="files" name="files[]" multiple />;
    </div>

}

export default LoadFileComponent;