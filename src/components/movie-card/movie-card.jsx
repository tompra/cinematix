export const MovieCard = ({ movieData, onMovieClick }) => {
    return (
        <div>
            <button
                onClick={() => onMovieClick(movieData)}
                className='btn--movie__title'
            >
                {movieData.title}
            </button>
        </div>
    );
};
