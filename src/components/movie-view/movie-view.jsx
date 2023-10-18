export const MovieView = ({ movieData, onBackClick }) => {
    movieData.actors.map(actor => {
        console.log(actor);
    });

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
                <hr />
                <span>{movieData.title}</span>
            </div>
            <div className='movie--details__container'>
                <span className='movie--details__title'>Description</span>
                <hr />
                <span>{movieData.description}</span>
            </div>
            <div className='movie--details__container'>
                <span className='movie--details__title'>Genre</span>
                <hr />
                <span>{movieData.genre.name}</span>
            </div>
            <div className='movie--details__container'>
                <span className='movie--details__title'>Director</span>
                <hr />
                <span>{movieData.director.name}</span>
            </div>
            <button onClick={onBackClick}>Back</button>
        </div>
    );
};
