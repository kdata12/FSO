const RemoveBlog = ({ handleRemove, blogID }) => {
    return (
        <div>
            <button onClick={(event) => handleRemove(event, blogID)}>remove</button>
        </div>

    )
}

export default RemoveBlog