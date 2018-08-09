import React, { Component } from 'react';

export default ({name, number, icon, handleClick}) => {
    return (
        <div className="bucket" onClick={handleClick}>
            <div className="bucket-number">{number}</div>
            <div>{name}</div>
            <img src={icon} />
        </div>
    );
}
