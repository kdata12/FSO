const RemoveBlog = ({ handleRemove, blogID }) => {
    return (
        <div>
            <button id="remove-blog" onClick={(event) => handleRemove(event, blogID)}>remove</button>
        </div>

    )
}

export default RemoveBlog