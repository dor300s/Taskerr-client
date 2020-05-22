import React from 'react'
import { Link } from 'react-router-dom'
export function UnReadNotifications(props) {
const {notifications} = props
    return (
        <div className="nav-notifications-wrapper flex column align-center">
            <button onClick={props.markAsRead}>Clear All</button>
            {notifications.map((notifi, idx) => {
                return <div className="user-notification flex align-center space-between" key={idx}>
                    <p>{notifi.content}</p>
                    <Link className="notification-link" to={notifi.url}>Details</Link>
                </div>

            })}
        </div>
    )
}