import './ButtonForm.css';

export const ButtonForm = ({ message, handleClick }) => {
    return (
        <button onClick={handleClick} className="button-form">{message}</button>
    )
}