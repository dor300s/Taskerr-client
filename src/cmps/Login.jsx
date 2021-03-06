import React from 'react';
import { connect } from 'react-redux'
import { login } from '../store/actions/userActions'
import { Link } from 'react-router-dom'

class Login extends React.Component {


    state = {
        username: null,
        password: null
    }

    inputHandler = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState({ [field]: value })
    }

    onSubmit = (ev) => {
        ev.preventDefault()
        const { username, password } = this.state
        const credentials = {
            username,
            password
        }

        this.props.login(credentials)
            .then(() => {

                this.props.history.push('/board')
            })
            .catch(console.log('ERROR')) // TODO: Show error modal

    }

    render() {
        return (
            <div className="login-container flex column space-between align-center">
                <h2>Login</h2>
                <form className="flex column space-between" onSubmit={this.onSubmit}>
                    <input type="text" placeholder="username" name="username" autoComplete="off" onChange={this.inputHandler} />
                    <input type="password" placeholder="Password" name="password" onChange={this.inputHandler} />
                    <button>Login</button>
                </form>
                <p>Don't have an account?<Link to="/signup">signup</Link></p>
            </div>
        )
    }
}
const mapDispatchToProps = {
    login
}

export default connect(null, mapDispatchToProps)(Login)