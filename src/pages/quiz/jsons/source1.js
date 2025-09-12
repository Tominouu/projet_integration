export const quiz = {
    quizTitle: "Premier Temps – Écouter",
    quizSynopsis: "Découvre Bordeaux par ses sons et ses saveurs, du marché des Capucins à la Garonne, entre marchandes, gabarres et canelés.",
    progressBarColor: "#6C1227",
    nrOfQuestions: "3",
    questions: [
        {
            question: "Où se trouve le Marché des Capucins ?",
            questionType: "text",
            answerSelectionType: "single",
            answers: [
                "À proximité de la Gare Saint-Jean",
                "Sur les quais de la Garonne",
                "Près de la Place des Quinconces",
                "À côté du Palais Gallien"
            ],
            correctAnswer: "1",
            messageForCorrectAnswer: "Bravo ! Le marché est à deux pas de la Gare Saint-Jean.",
            messageForIncorrectAnswer: "Non, il se trouve près de la Gare Saint-Jean.",
            point: "20"
        },
        {
            question: "Quel dessert emblématique est né grâce aux jaunes d’œufs inutilisés par les maîtres de chai ?",
            questionType: "text",
            answerSelectionType: "single",
            answers: ["Le macaron", "Le canelé", "Le pastis landais", "Le millasson"],
            correctAnswer: "2",
            messageForCorrectAnswer: "Exact, le canelé est devenu l’un des symboles de Bordeaux !",
            messageForIncorrectAnswer: "Mauvaise réponse, il s’agit du canelé.",
            point: "20"
        },
        {
            question: "Comment appelle-t-on le port de Bordeaux inscrit au patrimoine mondial ?",
            questionType: "text",
            answerSelectionType: "single",
            answers: [
                "Port des Chartrons",
                "Port de la Lune",
                "Port Saint-Jean",
                "Port de la Bastide"
            ],
            correctAnswer: "2",
            messageForCorrectAnswer: "Bien vu, Bordeaux est surnommée le Port de la Lune.",
            messageForIncorrectAnswer: "Faux, il s’agit du Port de la Lune.",
            point: "20"
        }
    ]
}