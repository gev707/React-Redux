import PropTypes from 'prop-types';
import React, { PureComponent } from "react";
import dateFormat from '../helpers/dateFormatter'
import DatePicker from "react-datepicker";
import styles from "./modal.module.css";
import { connect } from 'react-redux'
import { changeValues, setDate, getEditValue, reset } from '../../Redux/simpleAction';
import { editCardThunk } from '../../Redux/requestAction'
class EditModal extends PureComponent {

    handleSubmit = ({ key, type }) => {
        const { editCardFromState } = this.props;
        const { title, description, date } = editCardFromState
        if (!title || !description || (type === 'keypress' && key !== 'Enter')) return;
        const editCard = {
            ...editCardFromState,
            date: dateFormat(date)
        }
        this.props.editCardThunk(editCard, 'todo');
        this.props.reset()
    }
    componentDidMount = () => {
        const { editCard } = this.props;
        this.props.getEditValue(editCard)
        console.log(editCard)
    }
    render() {
        const { onHide } = this.props;
        const { title, description, date } = this.props.editCardFromState
        return (
            <div
                className={styles.modalHolder}
            >
                <div className={styles.closeModal}>
                    <span onClick={event => onHide()}></span>
                </div>
                <h2>{"Edit Card"}</h2>
                <div className='p-2'>
                    <div className={styles.inputHolder}>
                        <input
                            name='title'
                            className={styles.inputItem}
                            type="text"
                            placeholder='Add some Card'
                            onChange={(e) => this.props.changeValues(e.target)}
                            onKeyPress={this.handleSubmit}
                            value={title}
                        />
                    </div>
                    <div>
                        <textarea
                            name='description'
                            className={styles.textarea}
                            onChange={(e) => this.props.changeValues(e.target)}
                            placeholder='Card Description. . . '
                            style={{ resize: 'none' }}
                            value={description}
                        >
                        </textarea>
                    </div>
                    <div className="d-flex mt-3">
                        <DatePicker
                            selected={date}
                            onChange={date => this.props.setDate(date)}
                            className='datapicker'
                        />
                    </div>
                </div>
                <div className={styles.btnSave}>
                    <button
                        onClick={(e) => onHide()}
                    >Close Card
                        </button>
                    <button
                        onClick={this.handleSubmit}
                    >{'Save Card'}
                    </button>
                </div>
            </div>
        )
    }
}
EditModal.propTypes = {
    editCard: PropTypes.object,
}
const mapStateToProps = state => ({
    editCardFromState: { ...state.editModalState }
})
const mapDispatchToProps = {
    changeValues,
    editCardThunk,
    setDate,
    getEditValue,
    reset
}
export default connect(mapStateToProps, mapDispatchToProps)(EditModal)
