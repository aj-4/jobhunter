import React, { Component } from 'react';

export default ({name, number, icon}) => {
    return (
        <div className="bucket">
            <div className="bucket-number">{number}</div>
            <div>{name}</div>
            <img src={icon} />
        </div>
    );
}
