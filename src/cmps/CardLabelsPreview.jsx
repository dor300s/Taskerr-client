import React from 'react'

export function CardLabelsPreview(props) {

    const {labels} = props;  
    console.log('labels', labels)

    return (
        <div className="labels flex">
            {labels.map(lable => {
                return(
                    <div className="label" style={{background: lable.color}}>{lable.txt}</div>
                )
            })}
        </div>
    )
}