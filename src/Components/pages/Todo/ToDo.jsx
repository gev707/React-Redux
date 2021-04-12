import React from "react";
import Task from '../../Tasks/Task';
import Modal from '../../Modal/Modal';
import EditModal from '../../Modal/EditModal'
import Confirm from '../../Confirm/Confirm';
import styles from "./todo.module.css";
import Spinner from "../../Spinner/Spinner";
import { connect } from 'react-redux';
//thunks
import {
    setCardsThunk,
    addCardThunk,
    deleteOneCardThunk,
    deleteAllCheckedCardThunk,
} from "../../../Redux/action";

class Todo extends React.Component {
    state = {
        editCard: null
    }
    toggleEditModal = (card) => {
        this.setState({
            editCard: card
        })
    }
    componentDidMount() {
        this.props.setCard()
    }
    componentDidUpdate = (prevProps) => {
        if (!prevProps.editSuccess && this.props.editSuccess) {
            this.setState({
                editCard: null
            })
        }
    }
    render() {
        const {
            cards,
            checkedCards,
            isOpenModal,
            isOpenConfirm,
            isCheckedCard,
            loading,
        } = this.props;
        const { editCard } = this.state
        const card = cards.map(card => {
            return <Task
                card={card}
                key={card._id}
                deleteCard={this.props.deleteCurrentCard}
                handleToggleCheckCards={this.props.toggleCheckCard}
                isAnyCardChecked={checkedCards.size}
                isChecked={checkedCards.has(card._id)}
                toggleOpenModal={this.props.toggleOpenModal}
                onEdit={this.toggleEditModal}
            />
        });
        return (
            <section className='container'>
                <div className={editCard || isOpenModal || isOpenConfirm ? 'filter' : "noFilter"}>
                    <h1>This is ToDo Component</h1>
                    <div className={styles.inputHolder}>
                        <button
                            className={styles.btnAddText}
                            onClick={this.props.toggleOpenModal}
                            disabled={checkedCards.size !== 0}
                        >Add Card Modal
                        </button>
                    </div>
                    <div className={styles.btnHolder}>
                        <button
                            onClick={this.props.toggleOpenConfirm}
                            className={styles.btnDeleteAll}
                            disabled={cards.length === 0}
                        >
                            Delete All Cards
                        </button>
                        <button
                            onClick={this.props.toggleCheckedAll}
                            className={styles.btnCheckAll}
                            disabled={cards.length === 0}
                        >
                            {checkedCards.size && cards.length === checkedCards.size ? "Remove Checked" : "Checked All"}
                        </button>
                    </div>
                    <div className={styles.container}>
                        <div className={styles.row}>
                            <div className={styles.textHolder}>
                                {card.length ? card : <h2 className={styles.addSome}>Add some Card!</h2>}
                            </div>
                        </div>
                    </div>
                </div>

                {
                    isOpenModal && <Modal
                        onHide={this.props.toggleOpenModal}
                        onSubmit={this.props.addCard}
                    />
                }
                {
                    !!editCard && <EditModal
                        onHide={() => this.toggleEditModal(null)}
                        editCard={editCard}
                    />
                }
                {
                    isOpenConfirm && <Confirm
                        onHide={this.props.toggleOpenConfirm}
                        deleteCard={() => this.props.deleteCheckedCard(checkedCards)}
                        countOrCardTitle={isCheckedCard ? isCheckedCard.title : checkedCards.size}
                    />
                }
                {
                    loading && <Spinner />
                }

            </section>
        )
    }
}
const mapStateToProps = state => {
    console.log(state)
    const {
        cards,
        editSuccess,
        isOpenModal,
        isOpenConfirm,
        checkedCards,
        deleteCardId,
        isCheckedCard } = state.todoState
    return {
        cards,
        editSuccess,
        isOpenModal,
        isOpenConfirm,
        checkedCards,
        deleteCardId,
        isCheckedCard,
        loading: state.loading
    }

}
const mapDispatchToProps = dispatch => {
    return {
        setCard: () => dispatch(setCardsThunk),
        addCard: (data) => dispatch((dispatch) => addCardThunk(dispatch, data)),
        deleteCurrentCard: (_id) => dispatch((dispatch) => deleteOneCardThunk(dispatch, _id)),
        deleteId: _id => dispatch({ type: 'DELETE_CARD_ID', _id }),
        deleteCheckedCard: (checkedCards) => dispatch((dispatch) => deleteAllCheckedCardThunk(dispatch, checkedCards)),
        toggleCheckCard: _id => dispatch({ type: 'TOGGLE_CHECK_CARD', _id }),
        toggleCheckedAll: () => dispatch({ type: 'TOGGLE_CHECK_ALL_CARDS' }),
        toggleOpenModal: () => dispatch({ type: 'TOGGLE_OPEN_MODAL' }),
        toggleOpenConfirm: () => dispatch({ type: 'TOGGLE_CONFIRM_MODAL' }),
        closeEditModal: () => dispatch({ type: 'CLOSE_EDIT_MODAL' })
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(Todo)