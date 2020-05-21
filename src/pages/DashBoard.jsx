import React from 'react';
// import { getBoards } from '../tempSeviceData/tempBoardData.js';
import { connect } from 'react-redux';
import BoardList from '../cmps/BoardList.jsx';
import { setBoards } from '../store/actions/boardActions.js'


class DashBoard extends React.Component {

    state = {
        boards: []
    }

    componentDidMount() {
        this.props.setBoards();
        this.loadBoards()
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) this.loadBoards()
    }

    loadBoards() {
        let currBoards = this.props.boards
        this.setState({ boards: currBoards })
    }

    onBoardClicked = (id) => {
        this.props.history.push(`/board/${id}`)
    }

    addBoard() {
        console.log('hii');

    }


    render() {
        const { boards } = this.state;
        let filteredBoards = boards.filter(board => board.isStarred);
        console.log(filteredBoards);

        return (
            <div className="dashboard">
                <h2 className="label">Starred:</h2>
                <div className="boards-container flex">
                    <BoardList boards={filteredBoards} onBoardClicked={this.onBoardClicked} addBoard={this.addBoard} />
                </div>

                <h2 className="label">All Boards:</h2>
                <div className="boards-container flex">
                    <BoardList boards={boards} onBoardClicked={this.onBoardClicked} addBoard={this.addBoard} />
                </div>

            </div >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        boards: state.boardApp.boards
    }
}
const mapDispatchToProps = {
    setBoards
}

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard)