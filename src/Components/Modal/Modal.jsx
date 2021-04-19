
import PropTypes from 'prop-types';
import React from "react";
import dateFormat from '../helpers/dateFormatter'
import DatePicker from "react-datepicker";
import styles from "./modal.module.css";
import { connect } from 'react-redux'
import { changeValues, setDate,reset} from '../../Redux/simpleAction';
const Modal =(props)=>{
    
    const handleSubmit = ({ key,type }) => {
        const { title, description} = props;
        if (!title || !description || (type === 'keypress' && key !== 'Enter')) return; 
               const formData = {
                   ...props,
                   date:dateFormat(props.date)
               }
               props.onSubmit(formData)
               props.reset()
    };
        const {onHide} = props;
        const {title,description,date} = props
        
        return (
                <div 
                     className={styles.modalHolder}
                > 
                    <div  className={styles.closeModal}>
                        <span onClick={event=>onHide()}></span>
                    </div>
                    <h2>{'Create Your Card'}</h2>
                    <div className='p-2'>
                        <div className={styles.inputHolder}>
                            <input
                                name='title'
                                className={styles.inputItem}
                                type="text"
                                placeholder='Add some Card'
                                onChange={(e)=>props.changeValues(e.target)}
                                onKeyPress={handleSubmit}
                                value={title}
                            />
                        </div>
                        <div>
                            <textarea
                                name='description'
                                className={styles.textarea}
                                onChange={(e)=>props.changeValues(e.target)}
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
                            onClick={(e) => onHide()}
                            >Close Card
                        </button>
                        <button 
                            onClick={handleSubmit}
                            >{'Add Card'}
                        </button>
                    </div>
                </div>
        )
    
    
}
Modal.propTypes = {
    onSubmit:PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    title: state.modalState.title,
    description: state.modalState.description,
    date: state.modalState.date

})
const mapDispatchToProps = {
    changeValues,
    setDate,
    reset
}
export default connect(mapStateToProps, mapDispatchToProps)(Modal)