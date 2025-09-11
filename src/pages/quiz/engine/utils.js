export function normalizeCorrectIndexes(q) {
    const raw = q.correctAnswer
    if (Array.isArray(raw)) return raw.map(String)
    if (typeof raw === 'string') {
        if (raw.includes(',')) return raw.split(',').map(s => s.trim())
        return [raw.trim()]
    }
    return ['1']
}

export function isMultiple(q) {
    return (q.answerSelectionType || 'single') === 'multiple'
}

export function compareSelections(correctIdxArr, userIdxArr) {
    const a = [...new Set((correctIdxArr || []).map(String))].sort()
    const b = [...new Set((userIdxArr || []).map(String))].sort()
    if (a.length !== b.length) return false
    for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false
    return true
}

export function toAnswerTexts(answers, idxArr) {
    return (idxArr || []).map(idxStr => {
        const i = Number(idxStr) - 1
        return answers?.[i] ?? ''
    })
}
