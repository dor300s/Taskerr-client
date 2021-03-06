import React, { Component } from 'react'
import { loadUsers , getUser } from '../store/actions/userActions'
import { connect } from 'react-redux'
import socketService from '../services/socketService'

class InviteMemberModal extends Component {

    state = {
        filteredUsers: null,
        isAlreadyInvitesShown: false,
        keyword: ''
    }

    componentDidMount() {
        this.props.loadUsers()
        document.addEventListener("mousedown", this.onCloseInviteMenu, false);
        document.addEventListener("keydown", this.onCloseInviteMenu, false);
    }


    componentWillUnmount() {
        document.removeEventListener("mousedown", this.onCloseInviteMenu, false);
        document.removeEventListener("keydown", this.onCloseInviteMenu, false);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.users !== this.props.users) {
            
            setTimeout(()=>{this.filterUsers(this.state.keyword)},1500)
    }
}

    onCloseInviteMenu = (ev) => {
        ev.stopPropagation();
        if (!this.node.contains(ev.target) || ev.keyCode === 27) {
            // this.setState({ isMenuOpen: false })
            this.props.onCloseInviteMenu();
        }
    }

    inputHandler = ({ target }) => {
        this.setState({keyword: target.value})
        if (!target.value) {
            this.setState({ filteredUsers: null })
            return
        }

        let keyWord = target.value.toLowerCase()
        const { users } = this.props
        let filteredUsers = users.filter(user => user.userName.includes(keyWord.toLowerCase()))
        this.setState({ filteredUsers })
    }

    filterUsers = (keyword) => {
        // this.props.loadUsers()
        const { users } = this.props
       keyword = keyword.toLowerCase()
       let filteredUsers = users.filter(user => user.userName.includes(keyword.toLowerCase())) 
       this.setState({ filteredUsers })   
    }

    onInvite = (userId) => {
        let userIdxInBoard = this.props.activeBoard.members.findIndex(user => user._id === userId)
        if (userIdxInBoard !== -1) {
            this.setState({ isAlreadyInvitesShown: true })
            setTimeout(() => {
                this.setState({ isAlreadyInvitesShown: false })
            }, 1500)
            return
        }
        let data = {
            invitedUserId: userId,
            sender: this.props.loggedUser.userName,
            collabBoardId: this.props.activeBoard._id,
            createdAt: Date.now()
        }
        socketService.emit('user invite', data);
    }

    render() {
        const { filteredUsers, isAlreadyInvitesShown } = this.state
        const { isInviteModalOpen } = this.props

        return (
            <div ref={node => this.node = node} className={`invite-members-modal ${(isInviteModalOpen) ? 'modal-open' : ''} flex column align-center`}>
                <div className="invite-header"><h3>Invite to collaborate</h3></div>
                {isAlreadyInvitesShown && <p>User already a member!</p>}
                <input type="text" placeholder="Enter userName to invite" onKeyUp={this.inputHandler} />
                {filteredUsers && <div className="invite-users-list flex column align-center">
                    {filteredUsers.map((user, idx) => {
                        return <div key={idx} className="user-to-invite flex align-center ">
                            <span className="nav-user-profile" style={{
                                backgroundImage: "url(" + `${user.imgUrl}` + ")",
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat'
                            }}>
                            </span>
                            <div className="flex column" style={{marginLeft:"10px"}}>
                                <h4 style={{marginBottom:"3px"}}>{user.fullName}</h4>
                                {user.isLogIn &&
                                    <div className="user-status flex align-center">
                                        <h5 style={{color:"green"}}>Online</h5>
                                        {/* <span className="user-online"></span> */}
                                    </div>}

                                {!user.isLogIn &&
                                    <div className="user-status flex align-center">
                                        <h5 style={{color:"gray"}}>Offline</h5>
                                        {/* <span className="user-offline"></span> */}
                                    </div>}
                            </div>
                            <button className="user-invite-btn" onClick={() => this.onInvite(user._id)}>Invite</button>

                        </div>
                    })}
                </div>}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        users: state.user.users,
        loggedUser: state.user.loggedInUser,
        activeBoard: state.boardApp.currBoard
    }
}

const mapDispatchToProps = {
    loadUsers,
    getUser
}

export default connect(mapStateToProps, mapDispatchToProps)(InviteMemberModal)