
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
} from '../../../Redux/action'
import React, { PureComponent } from 'react'
import EditModal from '../../Modal/EditModal';

class SingleCardWithReducer extends PureComponent {

    componentDidMount = () => {
        const { id } = this.props.match.params;
        this.props.getSingleCard(id);
    }
    deleteSingleCard = () => {
        const { _id } = this.props.singleCard
        this.props.deleteSingleCard(_id)
        this.props.history.push('/')
    }
    toggleModal = () => {
        this.props.toggleOpenModal()
    }
    handleEditCard = (singleCard)=> {
        this.props.editedCard(singleCard)
    }
    render() {

        const { singleCard,isEditModalOpen } = this.props;
        console.log(this.props)


        if (singleCard === {}) return <Spinner />
        else {
            return (

                <>
                    <div className={styles.singleCardHolder}>
                        <div className={styles.goBackPage}>
                            <Button
                                variant='dark'
                                style={{ color: '#ddd' }}
                                onClick={() => this.props.history.goBack()}
                            >Go Back
                    </Button>
                        </div>
                        <div className={styles.singleCardReducerBody}>
                            <h1>- Title - <br />{singleCard.title}</h1>
                            <h2>- Description - <br />{singleCard.description}</h2>
                            <p><small>- Date - {singleCard.date}</small></p>

                            <div className={styles.singleCardBtns}>
                                <button
                                    onClick={this.deleteSingleCard}
                                >
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </button>
                                <button
                                    onClick={this.props.toggleOpenModal}
                                >
                                    <FontAwesomeIcon icon={faAddressCard} />
                                </button>

                            </div>
                        </div>
                    </div>
                    {
                        !!isEditModalOpen && <EditModal
                            onHide={this.props.toggleOpenModal}
                            onSubmit={this.handleEditCard} 
                            editCard={singleCard}  
                        />
                    }
                </>
            )
        }

    }
}
const mapStateToProps = state => {
    console.log(state);
    return {
        singleCard: state.singleCard,
        isEditModalOpen: state.isEditModalOpen
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getSingleCard: (data) => dispatch((dispatch) => getSingleCardThunk(dispatch, data)),
        deleteSingleCard: (data) => dispatch((dispatch) => deleteSingleCardThunk(dispatch, data)),
        editedCard:(data) => dispatch((dispatch) => editCardThunk(dispatch,data)),
        toggleOpenModal: () => dispatch({ type: 'OPEN_EDIT_MODAL'}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleCardWithReducer)
