const express = require('express');
const router = express.Router();

const testingObject = {
    films: {
        '1': {
            name: 'Denial',
            runtime: 87,
            description: 'This is a test movie. Nothing to see here.<br>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
            date: '2023-11-25 18:30:00',
            posterURL: 'https://cdn.shopify.com/s/files/1/0057/3728/3618/files/mandalorian_ver49_500x749.jpg?v=1688571402',
            trailerURL: 'https://www.youtube.com/watch?v=7PIji8OubXU',
            ticketURL: 'https://mycolor.space/?hex=%23B80D0D&sub=1',
            ageRating: '15 år',
            genre: 'Drama',
            premiere: false,
        },

        '2': {
            name: 'Anger',
            runtime: 157,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            date: '2023-11-30 19:30:00',
            posterURL: 'https://cdn.shopify.com/s/files/1/0057/3728/3618/products/7dfddd911b8040729896c5be83f8e139_6e2f4149-8cb4-414c-a33b-9e0065c55af3_500x749.jpg?v=1573585216',
            trailerURL: 'https://www.youtube.com/watch?v=7ZP7TWiOrDs',
            ticketURL: 'https://mycolor.space/?hex=%23A20E0D&sub=1',
            ageRating: '11 år',
            genre: 'Action',
            premiere: true,
        },

        '3': {
            name: 'Bargaining',
            runtime: 37,
            description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            date: '2023-12-09 17:10:00',
            posterURL: 'https://cdn.shopify.com/s/files/1/0057/3728/3618/products/c1b8c420c0f17ac6fd55ae18f0040b14_bb27bef0-31a0-466f-bf87-1d37db773923_500x749.jpg?v=1573618758',
            trailerURL: 'https://www.youtube.com/watch?v=ucZl6vQ_8Uo',
            ticketURL: 'https://mycolor.space/?hex=%23226FBD&sub=1',
            ageRating: '15 år',
            genre: 'Sceince Fiction, Thriller',
            premiere: false,
        }, 
        
        '4': {
            name: 'Depression',
            runtime: 67,
            description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
            date: '2023-12-19 18:00:00',
            posterURL: 'https://cdn.shopify.com/s/files/1/0057/3728/3618/products/07c231f2775f4ece93b1af53e5009298_5e9d1433-5ebd-4343-956c-5478acce8afa_500x749.jpg?v=1573618953',
            trailerURL: 'https://www.youtube.com/watch?v=jECIZpEsX5s',
            ticketURL: 'https://mycolor.space/?hex=%23FFFFFF&sub=1',
            ageRating: '7 år',
            genre: 'Reality',
            premiere: false,
        },
        
        '5': {
            name: 'Acceptance',
            runtime: 197,
            description: '',
            date: '2023-12-24 20:00:00',
            posterURL: 'https://cdn.shopify.com/s/files/1/0057/3728/3618/products/924607fa629851bc686d925ab8a63e70_500x749.jpg?v=1573572635',
            trailerURL: 'https://www.youtube.com/watch?v=3VZFpwlXKpg&pp=ygUKdGVzdCB2aWRlbw%3D%3D',
            ticketURL: 'https://mycolor.space/?hex=%23000000&sub=1',
            ageRating: '',
            genre: 'Science Fiction, Action, Drama',
            premiere: true,
        }
    }
}

router.get('/', (req, res) => {
    res.redirect('/bio-rosen/filmer');
})

router.get('/filmer', (req, res) => {
    res.render('filmer', { 
        title: 'Filmer', 
        uniqueTitle: 'Bio Rosen',
        films: testingObject.films
    });
});

router.get('/live-pa-bio', (req, res) => {
    res.render('livePaBio', { title: 'Live På Bio', uniqueTitle: 'Bio Rosen' });
});

router.get('/bio-kontrast', (req, res) => {
    res.render('bioKontrast', { title: 'Bio Kontrast', uniqueTitle: 'Bio Rosen' });
});

module.exports = router;