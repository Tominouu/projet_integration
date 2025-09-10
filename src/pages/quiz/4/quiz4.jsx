import Quiz from 'react-quiz-component';

import { quiz } from './source4.js';

export default function quiz4() {
    return (
        <div>
            <h1>Quiz partie 4</h1>
            <Quiz quiz={quiz} />
        </div>
    );
}