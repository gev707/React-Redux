
import { Button } from 'react-bootstrap'
import styles from './singlecard.module.css'
import Spinner from '../../Spinner/Spinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import {
    getSingleCardThunk,
    deleteSingleCardThunk,
    editCardThunk
} from '../../../Redux/requestAction'
import {
    toggleOpenEditModal,
    reset
} from '../../../Redux/simpleAction'
import React, { useEffect } from 'react'
import Modal from '../../Modal/Modal';

const SingleCard = (props) => {
    const {
        singleCard,
        isEditModalOpen,
        //functions
        getSingleCardThunk,
        deleteSingleCardThunk,
        toggleOpenEditModal,
        editCardThunk,
        
        reset
    } = props
    useEffect(() => {
        const { id } = props.match.params;
        getSingleCardThunk(id);
        return () => {
            reset();
        }
    }, [props.match.params, getSingleCardThunk, reset])

    const deleteSingleCard = () => {
        const { _id } = singleCard
        deleteSingleCardThunk(_id)
        props.history.push('/')
    }

    if (singleCard===null) return <Spinner />
    else {
        return (
            <>
                <div className={styles.singleCardHolder}>
                    <div className={styles.goBackPage}>
                        <Button
                            variant='dark'
                            style={{ color: '#ddd' }}
                            onClick={() => props.history.goBack()}
                        >Go Back
                    </Button>
                    </div>
                    <div className={styles.singleCardReducerBody}>
                        <h1>- Title - <br />{singleCard.title}</h1>
                        <h2>- Description - <br />{singleCard.description}</h2>
                        <p><small>- Date - {singleCard.date.slice(0,10)}</small></p>
                        <div className={styles.singleCardBtns}>
                            <button
                                onClick={deleteSingleCard}
                            >
                                <FontAwesomeIcon icon={faTrashAlt} />
                            </button>
                            <button
                                onClick={toggleOpenEditModal}
                            >
                                <FontAwesomeIcon icon={faAddressCard} />
                            </button>

                        </div>
                    </div>
                </div>
                {
                    isEditModalOpen && <Modal
                        onHide={toggleOpenEditModal}
                        onSubmit={(singleCard) => editCardThunk(singleCard, 'singleCard')}
                        editableCard={singleCard}
                    />
                }
            </>
        )
    }
}
const mapStateToProps = state => {
    return {
        singleCard: state.singleCardState.singleCard,
        isEditModalOpen: state.singleCardState.isEditModalOpen
    }
}
const mapDispatchToProps = {
    getSingleCardThunk,
    editCardThunk,
    deleteSingleCardThunk,
    toggleOpenEditModal,
    reset
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleCard)
