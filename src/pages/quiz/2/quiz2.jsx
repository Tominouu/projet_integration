import Quiz from 'react-quiz-component';

import { quiz } from './quiz';

export default function quiz2() {
    return (
        <div>
            <h1>Quiz partie 2</h1>
            <Quiz quiz={quiz} />
        </div>
    );
}