export const MovieView = ({ movieData, onBackClick }) => {
    return (
        <div>
            <div>
                <img src={movieData.image} className='movie-billboard' />
            </div>
            <div className='movie--details__container'>
                <span className='movie--details__title'>Title:</span>
                <span>{movieData.title}</span>
            </div>
            <div className='movie--details__container'>
                <span className='movie--details__title'>Description:</span>
                <span>{movieData.description}</span>
            </div>
            <div className='movie--details__container'>
                <span className='movie--details__title'>Genre:</span>
                <span>{movieData.genre}</span>
            </div>
            <div className='movie--details__container'>
                <span className='movie--details__title'>Director:</span>
                <span>{movieData.director}</span>
            </div>
            <button onClick={onBackClick}>Back</button>
        </div>
    );
};
