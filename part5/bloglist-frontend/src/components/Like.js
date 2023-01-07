const Like = ({ handleLike, blogID, blogLikes}) => {
    return (
        <>
            <button onClick={(event) => handleLike(event, blogID, blogLikes)}>like</button>
        </>
    )
}

export default Like
