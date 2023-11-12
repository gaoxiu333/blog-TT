const PostTitle = ({ title, date }: any) => {
    return (
        <div className="mb-8">
            <h1 className='text-left mb-0'>{title}</h1>
            <div>{date}</div>
        </div>
    )
}
export default PostTitle