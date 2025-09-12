export const quiz = {
    quizTitle: "Quatrième Temps – Se comprendre",
    quizSynopsis: "Bordeaux questionne le droit, la liberté et le vivre-ensemble : de Montesquieu aux Girondins, de Jacques Ellul aux débats d’aujourd’hui.",
    progressBarColor: "#6C1227",
    nrOfQuestions: "3",
    questions: [
        {
            question: "Quel philosophe bordelais a théorisé la séparation des pouvoirs ?",
            questionType: "text",
            answerSelectionType: "single",
            answers: ["Voltaire", "Montesquieu", "Rousseau", "Montaigne"],
            correctAnswer: "2",
            messageForCorrectAnswer: "Exact, Montesquieu est l’auteur de ‘De l’esprit des lois’.",
            messageForIncorrectAnswer: "Non, c’était Montesquieu.",
            point: "20"
        },
        {
            question: "Que commémore le monument aux Girondins sur les Quinconces ?",
            questionType: "text",
            answerSelectionType: "single",
            answers: [
                "La victoire de 1918",
                "Les députés girondins exécutés en 1793",
                "La fin de la guerre de Cent Ans",
                "L’indépendance d’Haïti"
            ],
            correctAnswer: "2",
            messageForCorrectAnswer: "Correct, il rend hommage aux Girondins de la Révolution française.",
            messageForIncorrectAnswer: "Faux, ce sont les députés girondins.",
            point: "20"
        },
        {
            question: "Quel penseur bordelais du XXe siècle s’inquiétait de la technique et de la liberté ?",
            questionType: "text",
            answerSelectionType: "single",
            answers: ["Jean Eustache", "Jacques Ellul", "François Mauriac", "Odilon Redon"],
            correctAnswer: "2",
            messageForCorrectAnswer: "Bien joué, c’était Jacques Ellul.",
            messageForIncorrectAnswer: "Faux, c’était Jacques Ellul.",
            point: "20"
        }
    ]
}