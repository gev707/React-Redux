import React from 'react';
import PropTypes from 'prop-types';
import styles from "./task.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faAddressCard, faCheckCircle, faHourglassHalf } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom'
// import { withRouter } from 'react-router-dom';
import { memo } from 'react';
const Task = ({
    card,
    handleToggleCheckCards,
    deleteCard,
    isChecked,
    onEdit,
    toggleStatus
}) => {
    return (
        <div className={!isChecked ? styles.taskHolder : styles.tasks}>
            <input
                className={styles.check}
                type='checkbox'
                onChange={(e) => handleToggleCheckCards(card._id)}
                checked={isChecked}
            />
            <div className={styles.taskFlex}>
                <NavLink to={'/card/' + card._id}><p className={styles.para}>{card.title}</p></NavLink>
                <p className={styles.description}>- Description - <br />{card.description}</p>
                {/* <p>Date: {card.date.slice(0,10)}</p> */}
                <div>
                    <button className={styles.taskBtn}>
                        <FontAwesomeIcon
                            onClick={() => deleteCard(card._id)}
                            icon={faTrashAlt}
                        />
                    </button>
                    <button className={styles.taskBtn}>
                        <FontAwesomeIcon
                            icon={faAddressCard}
                            onClick={() => onEdit(card)}
                        />
                    </button>
                    <button className={styles.taskBtn}>
                        <FontAwesomeIcon
                            icon={card.status === 'active' ? faHourglassHalf : faCheckCircle}
                            onClick={() => toggleStatus(card)}
                        />
                    </button>
                </div>

            </div>
        </div>
    )
}

Task.propTypes = {
    card: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    }),
    handleToggleCheckCards: PropTypes.func,
    deleteCard: PropTypes.func.isRequired,
    isChecked: PropTypes.bool

}

export default memo(Task);