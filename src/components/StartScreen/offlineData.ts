

export interface IQuestion {
    question: string;
    answers: string[];
    correctIndex: number;
    activeId?:string | number | undefined
}
export const offlineData: Array<IQuestion> = [
    {
        "question": "The capital of Ukraine?",
        "answers": [
            "Mirovany Kurylivtsi",
            "Belgorod",
            "Kiltyava",
            "Kyiv"
        ],
        "correctIndex": 3
    },
    {
        "question": "How many Eiffel towers are in Paris",
        "answers": [
            "mort than 10",
            "three",
            "one",
            "none"
        ],
        "correctIndex": 2
    },
    {
        "question": "Date of the beginning of World War II",
        "answers": [
            "October 26, 1939",
            "September 01, 1939",
            "May 9, 1945",
            "June 22, 1941"
        ],
        "correctIndex": 1
    },
    {
        "question": "What is the name of our home galaxy?",
        "answers": [
            "The Milky Way",
            "Andromeda",
            "The Large Magellanic Cloud",
            "NGC 6872"
        ],
        "correctIndex": 0
    },
    {
        "question": "Who was the Prime Minister of Great Britain from 1841 to 1846?",
        "answers": [
            "Edward Smith-Stanley",
            "Boris Johnson",
            "Lord John Russell",
            "Sir Robert Peel"
        ],
        "correctIndex": 3
    },
    {
        "question": "The capital of France",
        "answers": [
            "Paris",
            "Warsaw",
            "Lviv",
            "Ankara"
        ],
        "correctIndex": 0
    },
    {
        "question": "When did russia's invasion of Ukraine begin?",
        "answers": [
            "01.02.2022",
            "21.03.2022",
            "24.02.2022",
            "08.03.2020"
        ],
        "correctIndex": 2
    },
    {
        "question": "What is the scientific name of the butterfly?",
        "answers": [
            "Apis",
            "Coleoptera",
            "Formicidae",
            "Rhopalocera"
        ],
        "correctIndex": 3
    },
    {
        "question": "What is the sun's surface temperature?",
        "answers": [
            "1,233 K",
            "5,778 K",
            "12,130 K",
            "101,300 K"
        ],
        "correctIndex": 1
    },
    {
        "question": "Who stars in the movie Internship?",
        "answers": [
            "Ben Stiller, Jonah Hill",
            "Courteney Cox, Matt LeBlanc",
            "Kaley Cuoco, Jim Parsons",
            "Vince Vaughn, Owen Wilson"
        ],
        "correctIndex": 3
    },
    {
        "question": "The capital of Spain?",
        "answers": [
            "Berlin",
            "Los Angeles",
            "Madrid",
            "San Juan"
        ],
        "correctIndex": 2
    },
    {
        "question": "What color is the flag of Ukraine?",
        "answers": [
            "Red and blue",
            "Yellow and Blue",
            "Blue and yellow",
            "White, blue, red"
        ],
        "correctIndex": 2
    },
    {
        "question": "How much is 70 degrees Fahrenheit?",
        "answers": [
            "18.8889",
            "20",
            "21.1111",
            "158"
        ],
        "correctIndex": 2
    },
    {
        "question": "When Stepan Bandera was born?",
        "answers": [
            "January 1, 1909",
            "February 15, 1921",
            "June 18, 1918",
            "January 15, 1900"
        ],
        "correctIndex": 0
    },
    {
        "question": "What is the distance from the Earth to the Moon?",
        "answers": [
            "7,918 miles (12,742 km)",
            "86,881 miles (139,822 km)",
            "238,400 miles (384,400 km)",
            "35,980,000 miles (57,910,000 km)"
        ],
        "correctIndex": 2
    },
    {
        "question": "The number of glasses is 65 times 52?",
        "answers": [
            "117",
            "3120",
            "3380",
            "3520"
        ],
        "correctIndex": 2
    },
    {
        "question": "How high is Mount Everest?",
        "answers": [
            "6,683 ft (2,037 m)",
            "7,918 ft (2,413 m)",
            "19,341 ft (5,895 m)",
            "29,029 ft (8,847 m)"
        ],
        "correctIndex": 3
    },
    {
        "question": "When the movie 'The Avengers'?",
        "answers": [
            "May 2, 2008",
            "May 4, 2012",
            "May 3, 2013",
            "April 4, 2014"
        ],
        "correctIndex": 1
    },
    {
        "question": "how much is 48,879 in hexadecimal notation?",
        "answers": [
            "0x18C1",
            "0xBEEF",
            "0xDEAD",
            "0x12D591"
        ],
        "correctIndex": 1
    },
    {
        "question": "What is the name of the largest technology company in South Korea??",
        "answers": [
            "Aplle",
            "Samsung",
            "Lenovo",
            "Sony"
        ],
        "correctIndex": 1
    }
]
