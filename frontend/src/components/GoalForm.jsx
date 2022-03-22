//creates goal form

import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {createGoal} from '../features/goals/goalSlice'

function GoalForm() {
    const [text, setText] = useState('')
    //allows us to update state of 'text' to 'setText'
    //Default of useState is empty string

    const dispatch = useDispatch()

    const onSubmit = e => {
        e.preventDefault()

        dispatch(createGoal({text})) //dispatched createGoal from goalSlice
        setText('') //clears the form so it is ready for another Goal
    }

    return (
        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='text'>Goal</label>
                    <input 
                        type='text' 
                        name='text' 
                        id='text' 
                        value={text} 
                        onChange={(e) => setText(e.target.value)} />
                </div>
                <div className='form-group'>
                    <button className='btn btn-block' type='submit'>
                        Add Goal
                    </button>
                </div>
            </form>
        </section>
    )
}

export default GoalForm