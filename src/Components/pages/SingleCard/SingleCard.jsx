
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
    reset,
} from '../../../Redux/simpleAction'
import React, { useEffect } from 'react'
import Modal from '../../Modal/Modal';

const SingleCard = (props) => {
    const {
        singleCard,
        isOpenModal,
        //functions
        getSingleCardThunk,
        deleteSingleCardThunk,
        toggleOpenEditModal,
        editCardThunk,
        reset,
       
    } = props
    const { id } = props.match.params;
    useEffect(() => {
        getSingleCardThunk(id);
        return ()=> {
            reset();
        }
    }, [getSingleCardThunk,id,reset])

    const closeSingleCardModal = () => {
        props.history.push('/')
    }
    
    const deleteSingleCard = () => {
        const { _id } = singleCard
        deleteSingleCardThunk(_id)
        props.history.push('/')
    }

    if (!singleCard) return <Spinner />
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
                  isOpenModal && <Modal
                        onHide={closeSingleCardModal}
                        onSubmit={(singleCard) => editCardThunk(singleCard)}
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
        isOpenModal: state.singleCardState.isOpenModal,
    }
}
const mapDispatchToProps = {
    getSingleCardThunk,
    editCardThunk,
    deleteSingleCardThunk,
    toggleOpenEditModal,
    reset, 
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleCard)
