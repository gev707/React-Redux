
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
import {toggleOpenEditModal,reset} from '../../../Redux/simpleAction'
import React, { PureComponent } from 'react'
import EditModal from '../../Modal/EditModal';

class SingleCardWithReducer extends PureComponent {
    componentDidMount = () => {
        const { id } = this.props.match.params;
        this.props.getSingleCardThunk(id);
    }
    deleteSingleCard = () => {
        const { _id } = this.props.singleCard
        this.props.deleteSingleCardThunk(_id)
        this.props.history.push('/')
    }
    componentWillMount =()=> {
        this.props.reset()
    }
    render() {
        const { singleCard,isEditModalOpen } = this.props;
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
                                    onClick={this.props.toggleOpenEditModal}
                                >
                                    <FontAwesomeIcon icon={faAddressCard} />
                                </button>

                            </div>
                        </div>
                    </div>
                    {
                        !!isEditModalOpen && <EditModal
                            onHide={this.props.toggleOpenEditModal}
                            //onSubmit={(singleCard)=>this.props.editCardThunk(singleCard,'singleCard')}
                            editCard={singleCard}  
                        />
                    }
                </>
            )
        }

    }
}
const mapStateToProps = state => {
    return {
        singleCard: state.singleCardState.singleCard,
        isEditModalOpen: state.singleCardState.isEditModalOpen
    }
}
const mapDispatchToProps =  {
    getSingleCardThunk,
    editCardThunk,
    deleteSingleCardThunk,
    toggleOpenEditModal,
    reset
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleCardWithReducer)
