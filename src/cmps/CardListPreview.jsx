import React, { Component } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import CardPreview from './CardPreview.jsx'


export default class CardListPreview extends Component {

    state = {
        addlistForm: false,
        newlistTitle: '',
    }

    componentDidMount() {
        document.addEventListener("keydown", this.escFunction, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.escFunction, false);
    }


    escFunction = (event) => {
        if (event.keyCode === 27) {
            this.setState({ addlistForm: false, newlistTitle: '' })
        }
    }

    openForm = () => {
        this.setState({ addlistForm: true });
    }

    handleChange = (ev) => {
        const { value } = ev.target;
        this.setState({ newlistTitle: value })
    }

    handleSubmit = (ev) => {
        ev.preventDefault();
        this.createNewlist();
    }

    handleBlur = () => {
        if (this.state.newlistTitle) this.createNewlist();
        else this.setState({ addlistForm: false });
    }

    createNewlist() {
        const list = { title: this.state.newlistTitle }
        this.props.onAddList(list)
        this.setState({ addlistForm: false, newlistTitle: '' })
    }


    render() {
        const { cardListId, cardList, index, onDeleteList, onDeleteCard, onAddCard, currBoard, history } = this.props

        return (
            <Draggable key={cardListId} draggableId={cardListId} index={index} >
                {(provided, snapshot) => (
                    <div className={`wrap-card-list flex`} key={cardListId}
                        ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <Droppable droppableId={cardListId} key={cardListId} type={"card"}>
                            {(provided, snapshot) => (
                                <div className={`card-list-container flex column ${snapshot.isDraggingOver ? "lightblue" : ""}`} >
                                    <h2 className="trash" onClick={(event) => onDeleteList(currBoard, cardListId, event)}></h2>
                                    <div className={`card-list`} {...provided.droppableprops} ref={provided.innerRef} >
                                        {cardList.cards.map((card, index) => {
                                            return (
                                                <CardPreview key={card.id} cardListId={cardListId} currBoard={currBoard} onDeleteCard={onDeleteCard} card={card} index={index} history={history} />
                                            );
                                        })}
                                        {provided.placeholder}
                                    </div>
                                    <div onClick={() => { onAddCard(this.props.currBoard, cardListId) }} className="card-preview add-card" >Add Card</div>
                                </div>
                            )}
                        </Droppable>
                    </div>
                )}
            </Draggable>
        )
    }
}