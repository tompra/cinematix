import Proptypes from 'prop-types';

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

MovieCard.propTypes = {
    movieData: Proptypes.shape({
        title: Proptypes.string.isRequired,
        description: Proptypes.string.isRequired,
        image: Proptypes.string.isRequired,
        director: Proptypes.shape({
            name: Proptypes.string.isRequired,
            bio: Proptypes.string.isRequired,
            birthyear: Proptypes.string,
            deathyear: Proptypes.string,
        }),
        genre: Proptypes.shape({
            name: Proptypes.string.isRequired,
            description: Proptypes.string,
        }),
        actors: Proptypes.arrayOf(Proptypes.string),
    }).isRequired,
    onMovieClick: Proptypes.func.isRequired,
};
