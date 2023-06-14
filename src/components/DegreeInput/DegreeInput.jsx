import React, { useState } from 'react';

const DegreeInput = ({label}) => {

    const [value, setValue] = useState(0);

    return (
        <div>
            <label>{label}</label>
            <input type="number" value={value} onInput={e=>setValue(e.target.value)} />
        </div>
    );
}

export default DegreeInput;