import Quiz from 'react-quiz-component';

import { quiz } from './source5.js';

export default function quiz5() {
    return (
        <div>
            <h1>Quiz partie 5</h1>
            <Quiz quiz={quiz} />
        </div>
    );
}