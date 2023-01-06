const LogOut = ({ user, handleLogOut }) => {
    return (
        <div>
            {user.username} is logged in
            <button onClick={handleLogOut}>log out</button>
        </div>
    )
}

export default LogOut