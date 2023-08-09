import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { findValue } from "../StartScreen/options"
import { setQuizOptions } from "../../redux/rootSlice"
import './quizOptions.scss'

interface QuizOptionsProps {
    cross?: boolean,
}
export const QuizOptions: React.FC<QuizOptionsProps> = ({ cross }: QuizOptionsProps) => {
    const quizOptions = useAppSelector((state) => state.rootSlice.quizOptions)
    const errorMessage = useAppSelector((state) => state.rootSlice.errorMessage)
    const dispatch = useAppDispatch()

    function removeOptionHandler(value: string | number) {  
        const filteredQuizOptions = Object.entries(quizOptions)
            .filter(([key]) => {
                return key !== value
            })
        dispatch(setQuizOptions(Object.fromEntries(filteredQuizOptions)))
    }
    if (!errorMessage) {
        return (
            <div className="quiz-options">
                {Object.entries(quizOptions).map(([key, value], index) => {
                    return (
                        <div
                            className='quiz-options__item'
                            key={index}
                        >
                            {key} : {key === 'category' ? findValue(+value) : value}
                            {cross && <span className="cross" onClick={() => removeOptionHandler(key)}>&times;</span>}
                        </div>
                    )
                })}
            </div>
        )
    }
}
