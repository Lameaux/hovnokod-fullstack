import React from 'react';

export default ({language, value}) => {
    return (
        <pre>
            {language}: {value}
        </pre>
    );
}