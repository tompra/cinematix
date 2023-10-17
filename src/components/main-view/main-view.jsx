import { useState } from 'react';

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            title: 'The Godfather',
            id: 1,
            genre: 'Crime',
            description:
                'Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.',
            image: 'https://image.tmdb.org/t/p/w500//3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
            director: 'Francis Coppola',
        },
        {
            title: 'The Shawshank Redemption',
            id: 2,
            genre: 'Drama',
            description:
                'Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.',
            image: 'https://image.tmdb.org/t/p/w500//lyQBXzOQSuE59IsHyhrp0qIiPAz.jpg',
            director: 'Frank Darabont',
        },
        {
            title: 'The Godfather Part II',
            id: 3,
            genre: 'Crime',
            description:
                'In the continuing saga of the Corleone crime family, a young Vito Corleone grows up in Sicily and in 1910s New York. In the 1950s, Michael Corleone attempts to expand the family business into Las Vegas, Hollywood and Cuba.',
            image: 'https://image.tmdb.org/t/p/w500//hek3koDUyRQk7FIhPXsa6mT2Zc3.jpg',
            director: 'Francis Coppola',
        },
        {
            title: "Schindler's List",
            id: 4,
            genre: 'History',
            description:
                'The true story of how businessman Oskar Schindler saved over a thousand Jewish lives from the Nazis while they worked as slaves in his factory during World War II.',
            image: 'https://image.tmdb.org/t/p/w500//sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg',
            director: 'Steven Spielberg',
        },
        {
            title: 'Dilwale Dulhania Le Jayenge',
            id: 5,
            genre: 'Drama',
            description:
                'Raj is a rich, carefree, happy-go-lucky second generation NRI. Simran is the daughter of Chaudhary Baldev Singh, who in spite of being an NRI is very strict about adherence to Indian values. Simran has left for India to be married to her childhood fiancé. Raj leaves for India with a mission at his hands, to claim his lady love under the noses of her whole family. Thus begins a saga.',
            image: 'https://image.tmdb.org/t/p/w500//ktejodbcdCPXbMMdnpI9BUxW6O8.jpg',
            director: 'Aditya Chopra',
        },
        {
            title: '12 Angry Men',
            id: 6,
            genre: 'Drama',
            description:
                "The defense and the prosecution have rested and the jury is filing into the jury room to decide if a young Spanish-American is guilty or innocent of murdering his father. What begins as an open and shut case soon becomes a mini-drama of each of the jurors' prejudices and preconceptions about the trial, the accused, and each other.",
            image: 'https://image.tmdb.org/t/p/w500//ow3wq89wM8qd5X7hWKxiRfsFf9C.jpg',
            director: 'Sidney Lumet',
        },
        {
            title: 'Spirited Away',
            id: 7,
            genre: 'Animation',
            description:
                'A young girl, Chihiro, becomes trapped in a strange new world of spirits. When her parents undergo a mysterious transformation, she must call upon the courage she never knew she had to free her family.',
            image: 'https://image.tmdb.org/t/p/w500//39wmItIWsg5sZMyRUHLkWBcuVCM.jpg',
            director: 'Hayao Miyazaki',
        },
        {
            title: 'Parasite',
            id: 8,
            genre: 'Thriller',
            description:
                "All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident.",
            image: 'https://image.tmdb.org/t/p/w500//7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
            director: 'Bong Joon-ho',
        },
        {
            title: 'Your Name.',
            id: 9,
            genre: 'Animation',
            description:
                'High schoolers Mitsuha and Taki are complete strangers living separate lives. But one night, they suddenly switch places. Mitsuha wakes up in Taki’s body, and he in hers. This bizarre occurrence continues to happen randomly, and the two must adjust their lives around each other.',
            image: 'https://image.tmdb.org/t/p/w500//q719jXXEzOoYaps6babgKnONONX.jpg',
            director: 'Makoto Shinkai',
        },
    ]);

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }
    return (
        <div>
            {movies.map(movie => {
                return <div key={movie.id}>{movie.title}</div>;
            })}
        </div>
    );
};
