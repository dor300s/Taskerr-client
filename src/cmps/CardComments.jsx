import React, { Component } from 'react'
import { connect } from 'react-redux';
import { CardCommentsList } from './CardCommentsList'
import { saveBoard } from '../store/actions/boardActions'
import socketService from '../services/socketService'

let typingInterval;

class CardComments extends Component {

    state = {
        userMsg: null,
        isTypeActive: false,
        
    }

    componentDidMount() {
        const id = this.props.card.id

        socketService.on(`user-type-${id}`, (status) => {
            console.log('Get Focus Status from server');
            this.setState({isTypeActive: status})
        })
    }

    componentWillUnmount(){
        const id = this.props.card.id
        socketService.off(`user-type-${id}`)
    }

    onUserType = ({target}) => {
        const id = this.props.card.id
        this.setState({userMsg: target.value})
        clearInterval(typingInterval);
        socketService.emit('user typing' , {id , status: true} )
        typingInterval = setTimeout(()=>{
            socketService.emit('user typing' , {id , status: false} ) 
        },550)
            
        



            // setTimeout(()=>{
            //     socketService.emit('user typing' , {id , status: false} )
            // },300)
    }

    onSubmit = (ev) => {
        ev.preventDefault()
        const {card , board , user} = this.props
        const { userMsg } = this.state
        if(!userMsg) return

        let data = {
            
            userName: user.userName,
            txt: userMsg,
            imgUrl: user.imgUrl,
            createdAt: Date.now()
            
        }
        card.comments.unshift(data)
        this.props.saveBoard(board)
            .then(() => socketService.emit('board updated', board._id));
        this.setState({userMsg: ''})
    }

    render() {
        const { currUser, card, board } = this.props
        const {userMsg , isTypeActive} = this.state
        return (
            <div className="card-comments">
                <div className="flex align-center" style={{ marginBottom: "15px" }}>
                    <span className="comment" />
                    <h4>Comments</h4>
                </div>
                <div className="card-add-comment flex align-center" style={{ marginLeft: "40px", marginBottom: "15px" }}>
                    <div className="user-profile-comment" style={{
                        backgroundImage: "url(" + `${currUser.imgUrl}` + ")",
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }} >
                    </div>
                    <form onSubmit={this.onSubmit}>
                        <input className="user-text-input" type="text" placeholder={currUser.userName + ", whats on your mind?"}
                            onChange={this.onUserType} value={userMsg}  />
                    </form>
                    {isTypeActive && <span className="loading" />}
                </div>
                < CardCommentsList card={card} board={board} />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        currUser: state.user.loggedInUser
    }
}
const mapDispatchToProps = {
    saveBoard
}

export default connect(mapStateToProps, mapDispatchToProps)(CardComments)