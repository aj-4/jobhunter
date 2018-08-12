import React, { Component } from 'react';

export default (props) => {

    const {
        title,
        name,
        number,
        icon,
        handleClick,
        bucketMeta,
        active
    } = props;

    const boxStyle = active ?
        {
          backgroundColor: 'lightgrey',
          border: '1px solid black',
          borderBottom: `1px solid lightgrey`,
        } : 
        {
          borderBottom: '1px solid black',
        }

    return (
        <div 
            className={`bucket bucket-${name}`} 
            onClick={handleClick}
            style={boxStyle}
        >
            <div className="bucket-number">{number}</div>
            <div>{title}</div>
            <img src={icon} />
        </div>
    );
}
