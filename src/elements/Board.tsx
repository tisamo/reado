import React, {ReactDOM} from 'react';

import App from "../App";
import {TodoService} from "../services/todo-service";

function Board(props: any) {
    const todoService = new TodoService();
    const drop = (e: any) => {
        e.preventDefault();

        const card_id = e.dataTransfer.getData('card_id');
        console.log(card_id);
        const card = document.getElementById(card_id);
        if (card != null) {
            card.style.display = 'block';
            const category = e.target.getAttribute('color');
            const style = card.getAttribute('color');
            card.setAttribute('color', category);
            todoService.switchTodo(category, Number(card.getAttribute('id'))).then((item) => {
                props.setChanged(style, item.id, item);
            }).catch(err => err);
            console.log(card.getAttribute('style'));
        }
    }
    const dragOver = (e: any) => {
        e.preventDefault();
    }
    return <div
        id={props.id}
        onDrop={drop}
        onMouseUp={props.onMouseUp}
        style={props.style}
        color={props.color}
        className={props.className}
        onDragOver={dragOver}
    >
        {props.children}
        {props.category}
    </div>


}

export default Board;
