import { useMemo, useState } from 'react'
import '../../pages/styles/transitions.css'

// Props:
// - data: { quizTitle, quizSynopsis, questions: [ { question, questionType, answerSelectionType, answers, correctAnswer } ] }
// - onDone: callback quand toutes les questions de ce set sont parcourues
export default function QuestionPager({ data, onDone }){
  const items = useMemo(() => data?.questions || [], [data])
  const [i, setI] = useState(0)
  const [answer, setAnswer] = useState(null)

  if (!items.length) return <div>Aucune question</div>

  const q = items[i]
  const next = () => {
    if (i < items.length - 1) {
      setAnswer(null)
      setI(i + 1)
    } else {
      onDone?.()
    }
  }

  const selectSingle = (idx) => setAnswer(idx)
  const toggleMulti = (idx) => {
    setAnswer((prev) => {
      const arr = Array.isArray(prev) ? [...prev] : []
      const k = arr.indexOf(idx)
      if (k >= 0) arr.splice(k, 1)
      else arr.push(idx)
      return arr
    })
  }

  return (
    <div className="fadeSlideIn" style={{ display:'grid', gap: 8 }}>
      <div>
        <div style={{ fontWeight: 700 }}>{data.quizTitle || 'Quiz'}</div>
        <div style={{ fontSize: 12, opacity: .7 }}>{data.quizSynopsis}</div>
      </div>

      <div>
        <div style={{ marginBottom: 6 }}>{q.question}</div>
        <div style={{ display:'grid', gap: 6 }}>
          {(q.answers || []).map((opt, idx) => {
            const isSelected = Array.isArray(answer) ? answer.includes(idx) : answer === idx
            const base = { padding:'8px 10px', borderRadius:6, border:'1px solid #ccc', background:'#fff', cursor:'pointer', textAlign:'left' }
            const style = isSelected ? { ...base, background:'#eef6ff', border:'1px solid #9ec1ff' } : base
            const onClick = q.answerSelectionType === 'multiple' ? () => toggleMulti(idx) : () => selectSingle(idx)

            return <button key={idx} onClick={onClick} style={style}>{opt}</button>
          })}
        </div>
      </div>

      <div style={{ display:'flex', justifyContent:'flex-end', gap: 6 }}>
        <button onClick={next} style={{ padding:'8px 10px', borderRadius:6, border:'1px solid #ccc', background:'#fff' }}>Question suivante →</button>
      </div>
    </div>
  )
}
