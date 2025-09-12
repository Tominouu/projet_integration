export const quiz = {
    quizTitle: "Deuxième Temps – Connaître",
    quizSynopsis: "Explore l’histoire médiévale et antique de Bordeaux, entre Aliénor d’Aquitaine, gladiateurs et intendant Tourny.",
    progressBarColor: "#1B4965",
    nrOfQuestions: "3",
    questions: [
        {
            question: "Quel roi Aliénor d’Aquitaine épousa-t-elle à Bordeaux en 1137 ?",
            questionType: "text",
            answerSelectionType: "single",
            answers: ["Henri II Plantagenêt", "Louis VII", "Richard Cœur de Lion", "Philippe Auguste"],
            correctAnswer: "2",
            messageForCorrectAnswer: "Exact, elle épousa Louis VII avant d’épouser plus tard Henri Plantagenêt.",
            messageForIncorrectAnswer: "Mauvaise réponse, c’était Louis VII.",
            point: "20"
        },
        {
            question: "Quel monument romain rappelle l’époque antique de Bordeaux ?",
            questionType: "text",
            answerSelectionType: "single",
            answers: ["Amphithéâtre – Palais Gallien", "Tour Pey-Berland", "Grosse Cloche", "Grand Théâtre"],
            correctAnswer: "1",
            messageForCorrectAnswer: "Oui, le Palais Gallien est l’amphithéâtre romain de Bordeaux.",
            messageForIncorrectAnswer: "Non, c’est le Palais Gallien.",
            point: "20"
        },
        {
            question: "Quel intendant a transformé Bordeaux au XVIIIe siècle ?",
            questionType: "text",
            answerSelectionType: "single",
            answers: ["Vauban", "Tourny", "Colbert", "Montesquieu"],
            correctAnswer: "2",
            messageForCorrectAnswer: "Correct, Tourny redessina la ville et créa le fameux triangle d’or.",
            messageForIncorrectAnswer: "Faux, c’était l’intendant Tourny.",
            point: "20"
        }
    ]
}