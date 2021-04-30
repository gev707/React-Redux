import PropTypes from 'prop-types';
import React, { useEffect } from "react";
import dateFormat from '../../helpers/dateFormatter'
import DatePicker from "react-datepicker";
import styles from "./modal.module.css";
import { connect } from 'react-redux'
import {
    changeValues,
    setDate,
    getEditCard,
    reset
} from '../../Redux/simpleAction';

const Modal = (props) => {
    const {
        onHide,
        editableCard,
        //actions
        getEditCard,
        reset
    } = props
    const { title, description, date, } = props.state
    const handleSubmit = ({ key, type }) => {
        if (!title || !description || (type === 'keypress' && key !== 'Enter')) return;
        const formData = {
            ...props.state,
            date: dateFormat(date)
        }
        props.onSubmit(formData)
    };

    useEffect(() => {
        getEditCard(editableCard);
        return () => {
            reset()
        }

    }, [getEditCard, editableCard, reset])
    return (
        <div
            className={styles.modalHolder}
        >
            <div className={styles.closeModal}>
                <span onClick={onHide}></span>
            </div>
            <h2>{editableCard ? "Edit Card" : 'Create Your Card'}</h2>
            <div className='p-2'>
                <div className={styles.inputHolder}>
                    <input
                        name='title'
                        className={styles.inputItem}
                        type="text"
                        placeholder={editableCard ? "Change Card Title" : 'Add Card Title'}
                        onChange={(e) => props.changeValues(e.target)}
                        onKeyPress={handleSubmit}
                        value={title}
                    />
                </div>
                <div>
                    <textarea
                        name='description'
                        className={styles.textarea}
                        onChange={(e) => props.changeValues(e.target)}
                        placeholder='Card Description. . . '
                        style={{ resize: 'none' }}
                        value={description}
                    >
                    </textarea>
                </div>
                <div className="d-flex mt-3">
                    <DatePicker
                        selected={date}
                        onChange={(date) => props.setDate(date)}
                        className='datapicker'
                    />
                </div>
            </div>
            <div className={styles.btnSave}>
                <button
                    onClick={onHide}
                >Close Card
                        </button>
                <button
                    onClick={handleSubmit}
                >{editableCard ? "Save Changes" : 'Add Card'}
                </button>
            </div>
        </div>
    )


}
Modal.propTypes = {
    onSubmit: PropTypes.func.isRequired
}
const mapStateToProps = state => {

    return {
        state: state.modalState,
    }
}
const mapDispatchToProps = {
    changeValues,
    setDate,
    getEditCard,
    reset
}
export default connect(mapStateToProps, mapDispatchToProps)(Modal)