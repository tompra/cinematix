export const MovieCard = ({ movieData, onMovieClick }) => {
    return (
        <div>
            <button onClick={() => onMovieClick(movieData)}>
                {movieData.title}
            </button>
        </div>
    );
};
