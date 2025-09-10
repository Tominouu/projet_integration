import Quiz from 'react-quiz-component';

import { quiz } from './quiz';

export default function quiz1() {
    return (
        <div>
            <h1>Quiz partie 1</h1>
            <Quiz quiz={quiz} />
        </div>
    );
}