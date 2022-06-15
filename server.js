// Required dependencies

const express = require('express')
const app = express()
const PORT = 8900
const cors = require('cors')
app.use(cors())
require('dotenv').config()

//Middleware
app.set('view engine', 'ejs') //ejs e viewport
app.use(express.static('public')) //public folder servit clientului
app.use(express.urlencoded({ extended: true })) // nu stiu
app.use(express.json()) // permite express sa parse json

// Create books objects/ local db
const books ={
    'pride and prejudice':{
        'by':'Jane Austen',
        'published': 1813,
        'pageNumber': 311,
        'genre':'Fiction and Literature, Harvard Classics, Romance',
        'shortResume': "Austen's finest comedy of manners portrays life in the genteel rural society of the early 1800s, and tells of the initial misunderstandings (and mutual enlightenment) between lively and quick witted Elizabeth Bennet and the haughty Mr. Darcy.",
        'isbn': 0553213105
    },

    'taking chances':{
        'by':'An Omasta',
        'published': 2014,
        'pageNumber': 164,
        'genre':'Romance',
        'shortResume': "This fast-paced, exciting story follows the passionate journey of Abigail Brown, a 28-year-old divorcee who has never let's say, hit the high spot, much to her chagrin. Despite being self-conscious about what she considers to be her body's 'failings,' she has built a terrific life for herself in the quaint, lakeside town of Harbor Shores, Michigan. Abby thinks that she has discovered her 'happily ever after' ending when she stumbles upon the perfect man, who shows her the intense bliss that her body is capable of enjoying. Just when you think you have this book all figured out, some unexpected surprises come along and completely shake up Abby's world.",
        'isbn': '-'
    },
    'jane eyre':{
        'by':'Charlotte Brontë',
        'published': 1847,
        'pageNumber': 497,
        'genre':'Fiction and Literature, Gothic, Romance',
        'shortResume': "A poor governess, Jane Eyre, captures the heart of her enigmatic employer, Edward Rochester. Jane discovers that he has a secret that could jeopardize any hope of happiness between them.",
        'isbn': 0142437204
    },
    'the demon girl':{
        'by':'Penelope Fletcher',
        'published': 2010,
        'pageNumber': 208,
        'genre':'Creative commons, post-1930, Fantasy, Romance',
        'shortResume': "Rae Wilder has problems. Plunged into a world of dark magic, fierce creatures and ritual sacrifice, she is charged with a guarding a magical amulet. Rae finds herself beaten up, repeatedly, and forced to make a choice: to live and die human, or embrace her birth-right and wield magics that could turn her into something wicked, a force of nature nothing can control.",
        'isbn': '-'
    },
    'unforgettable':{
        'by':'Linda Barrett',
        'published': 2021,
        'pageNumber': 204,
        'genre':'Romance',
        'shortResume': " Doug Collins has never forgotten the girl he left behind. Even though it was Jennifer who’d made that final decision. 'Go to New York and have a wonderful life,” she’d said before running back to her family, a family that still needed her. But that was five years ago. Five years of Jen in the back of his mind, nestled in his heart. Now memories are not enough! Doug packs up his car and heads to Boston in search of that “wonderful life.'",
        'isbn': '-'
    },
    
}

// set up homepage
app.get('/', (request, response)=>{
    
    response.render('index.ejs', { info: books })
})

//Show all objects
app.get('/api', (request, response)=>{
    response.json(books)
})

//Show up individual object
app.get('/api/:bookName', (request, response)=>{
    const bookName = request.params.bookName.toLowerCase()
    if(books[bookName]){
        response.json(books[bookName])
    }else{
        response.json(books['Book not found!'])
    }
})

// set up Localhost on PORT
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on ${PORT}`);
})
