const BlogCreation = ({
    addBlog,
    title,
    author,
    url,
    handleTitle,
    handleAuthor,
    handleUrl,
}) => {
    return (
        <form onSubmit={addBlog}>
            <div>
                title: <input
                    type="text"
                    name='title'
                    value={title}
                    onChange={handleTitle}
                />
            </div>
            <div>
                author: <input
                    type="text"
                    name='author'
                    value={author}
                    onChange={handleAuthor}

                />
            </div>
            <div>
                url: <input
                    type="text"
                    name='url'
                    value={url}
                    onChange={handleUrl}
                />
            </div>
            <button type='submit'>create</button>
        </form>
    )
}

export default BlogCreation