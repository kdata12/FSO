const Like = ({ handleLike, blogID, blogLikes}) => {
    return (
        <>
            <button id="like" onClick={(event) => handleLike(event, blogID, blogLikes)}>like</button>
        </>
    )
}

export default Like
