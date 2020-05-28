import React, { Component } from 'react'
import userService from '../services/userService.js'


export class MemberPreview extends Component {

    state = {
        isUserModalOpen: false
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.onCloseUserModal, false);
        document.addEventListener("keydown", this.onCloseUserModal, false);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.onCloseUserModal, false);
        document.removeEventListener("keydown", this.onCloseUserModal, false);
    }

    onCloseUserModal = (ev) => {
        ev.stopPropagation();
        if (!this.node.contains(ev.target) || ev.keyCode === 27) {
            this.setState({ isUserModalOpen: false });
        }
    }

    onUserClick = (ev) => {
        ev.stopPropagation();
        this.setState(prevState => ({ isUserModalOpen: !prevState.isUserModalOpen }))
    }

    onUserLogOut = async() => {
        const { history } = this.props
        await userService.logout()
        history.push('/')

    }

    render() {

        const { user, history } = this.props
        const { onUserClick, onUserLogOut } = this
        const { isUserModalOpen } = this.state

        return (
            <div className="user-preview" ref={node => this.node = node} onClick={onUserClick}>
                {user.imgUrl ?
                    <div className="board-member" style={{
                        backgroundImage: "url(" + `${user.imgUrl}` + ")",
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }}>
                    </div>
                    :
                    <h3 className="nav-user-profile invite flex justify-center align-center">{user.fullName.charAt(0)}</h3>}

                {<div className={`member-modal ${isUserModalOpen? "modal-open": ""}`}>
                    <div onClick={() => history.push(`/user/${user._id}`)}> My details </div>
                    <div onClick={() => onUserLogOut()}>Log Out</div>
                </div>}
            </div>
        )
    }
}
