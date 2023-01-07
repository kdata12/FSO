const Notification = ({ message }) => {
    let style;
    if (message === null) {
        return
    }
    if (message.startsWith('Wrong') || message.startsWith('Error')) {
        style = {
            color: 'red',
            background: 'lightgrey',
            fontSize: 20,
            borderStyle: 'solid',
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
        }
    } else if (message.startsWith('a new blog') || message.startsWith('removed')) {
        style = {
            color: 'green',
            background: 'lightgrey',
            fontSize: 20,
            borderStyle: 'solid',
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
        }
    }

    return (
        <div>
            <h1 style={style}> {message} </h1>
        </div>
    )
}

export default Notification