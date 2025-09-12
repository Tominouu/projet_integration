export const quiz = {
    quizTitle: "Cinquième Temps – Communiquer",
    quizSynopsis: "Bordeaux s’exprime par ses écrivains, artistes et penseurs : Mauriac, Montaigne, Redon, Goya, Rosa Bonheur…",
    progressBarColor: "#6C1227",
    nrOfQuestions: "3",
    questions: [
        {
            question: "Quel écrivain bordelais est l’auteur des Essais ?",
            questionType: "text",
            answerSelectionType: "single",
            answers: ["Montaigne", "Mauriac", "Voltaire", "Molière"],
            correctAnswer: "1",
            messageForCorrectAnswer: "Exact, Montaigne écrivit ses célèbres Essais.",
            messageForIncorrectAnswer: "Non, c’est Montaigne.",
            point: "20"
        },
        {
            question: "Quel peintre espagnol exilé a passé ses dernières années à Bordeaux ?",
            questionType: "text",
            answerSelectionType: "single",
            answers: ["Picasso", "Velázquez", "Goya", "Dalí"],
            correctAnswer: "3",
            messageForCorrectAnswer: "Bravo, Goya a fini ses jours à Bordeaux.",
            messageForIncorrectAnswer: "Faux, il s’agit de Goya.",
            point: "20"
        },
        {
            question: "Quelle artiste bordelaise, passionnée par les animaux, a sa statue au Jardin Public ?",
            questionType: "text",
            answerSelectionType: "single",
            answers: ["Rosa Bonheur", "Louise Michel", "Flora Tristan", "Marie Brizard"],
            correctAnswer: "1",
            messageForCorrectAnswer: "Exact, Rosa Bonheur a marqué l’histoire de l’art animalier.",
            messageForIncorrectAnswer: "Non, c’était Rosa Bonheur.",
            point: "20"
        }
    ]
}