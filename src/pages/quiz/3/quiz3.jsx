import Quiz from 'react-quiz-component';

import { quiz } from './source3.js';

export default function quiz3() {
    return (
        <div>
            <h1>Quiz partie 3</h1>
            <Quiz quiz={quiz} />
        </div>
    );
}