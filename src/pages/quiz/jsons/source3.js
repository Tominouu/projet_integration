export const quiz = {
    quizTitle: "Troisième Temps – Comprendre",
    quizSynopsis: "Souviens-toi des visages marqués par les guerres, l’esclavage et la mémoire : Modeste Testas, Sousa Mendes, Boris Cyrulnik…",
    progressBarColor: "#2A6F4F",
    nrOfQuestions: "3",
    questions: [
        {
            question: "Qui était Modeste Testas ?",
            questionType: "text",
            answerSelectionType: "single",
            answers: [
                "Une négociante en vin",
                "Une femme réduite en esclavage venue d’Éthiopie",
                "Une résistante de 1944",
                "Une poétesse bordelaise"
            ],
            correctAnswer: "2",
            messageForCorrectAnswer: "Oui, son histoire symbolise la mémoire de l’esclavage.",
            messageForIncorrectAnswer: "Faux, Modeste Testas fut une esclave originaire d’Éthiopie.",
            point: "20"
        },
        {
            question: "Quel consul portugais a désobéi pour sauver des milliers de Juifs en 1940 ?",
            questionType: "text",
            answerSelectionType: "single",
            answers: [
                "Henri Salmide",
                "Aristides de Sousa Mendes",
                "Raymond Depardon",
                "Jean Eustache"
            ],
            correctAnswer: "2",
            messageForCorrectAnswer: "Exact, Sousa Mendes a signé des milliers de visas.",
            messageForIncorrectAnswer: "Non, c’était Aristides de Sousa Mendes.",
            point: "20"
        },
        {
            question: "Quel neuropsychiatre, enfant à Bordeaux, a développé le concept de résilience ?",
            questionType: "text",
            answerSelectionType: "single",
            answers: ["Boris Vian", "Boris Cyrulnik", "Albert Camus", "Jacques Ellul"],
            correctAnswer: "2",
            messageForCorrectAnswer: "Bonne réponse, Boris Cyrulnik est l’auteur de ce concept.",
            messageForIncorrectAnswer: "Mauvaise réponse, c’était Boris Cyrulnik.",
            point: "20"
        }
    ]
}