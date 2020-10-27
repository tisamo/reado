import React from 'react';
import {Simulate} from "react-dom/test-utils";


 function Cards(props:any) {
    const dragOver =(e:any) =>{

        e.stopPropagation();

    }
    const dragStart= (e:any) =>{
        const target = e.target;
        e.dataTransfer.setData('card_id', target.id);
        e.dataTransfer.setData('card_color', target.color);
    }
    return<div
        id={props.id}
        draggable={props.draggable}
        onDragOver={dragOver}
        color={props.color}
        onDragStart={dragStart}
    >
        {props.children}
        {props.category}
    </div>

}
export default Cards;
