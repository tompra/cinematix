export const MovieView = ({ movieData, onBackClick }) => {
    return (
        <div>
            <div>
                <img
                    src={movieData.image}
                    alt='Movie Poster'
                    className='movie-billboard'
                />
            </div>
            <div className='movie--details__container'>
                <span className='movie--details__title'>Title</span>
                <br />
                <span>{movieData.title}</span>
            </div>
            <div className='movie--details__container'>
                <span className='movie--details__title'>Description</span>
                <br />
                <span>{movieData.description}</span>
            </div>
            <div className='movie--details__container'>
                <span className='movie--details__title'>Genre</span>
                <br />
                <span>{movieData.genre.name}</span>
            </div>
            <div className='movie--details__container'>
                <span className='movie--details__title'>Director</span>
                <br />
                <span>{movieData.director.name}</span>
            </div>
            <button onClick={onBackClick}>Back</button>
        </div>
    );
};
