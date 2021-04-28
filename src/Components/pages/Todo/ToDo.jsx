import React, { PureComponent } from "react";
import Task from '../../Cards/Card';
import Search from '../../Search/Search'
import Modal from '../../Modal/Modal';
import Confirm from '../../Confirm/Confirm';
import styles from "./todo.module.css";
import Spinner from "../../Spinner/Spinner";
import { connect } from 'react-redux';
// request functions
import {
    getCardThunk,
    addCardThunk,
    deleteOneCardThunk,
    deleteAllCheckedCardThunk,
    editCardThunk,
    cardToggleStatus
} from "../../../Redux/requestAction";
//simple functions
import {
    toggleOpenModal,
    toggleOpenConfirm,
    toggleSetCard,
    toggleCheckedAll,
    toggleCheckCard,
    closeConfirmModal
} from "../../../Redux/simpleAction";

class Todo extends PureComponent {

    toggleSetCardModal = (editableCard = null) => {
        this.props.toggleSetCard(editableCard)
    }

    componentDidMount = () => {
        this.props.getCardThunk()
    }

    render() {
        const {
            cards,
            checkedCards,
            isOpenModal,
            isOpenConfirm,
            isCheckedCard,
            loading,
            editableCard,
            cardToggleStatus
        } = this.props;
        const card = cards.map(card => {
            return <Task
                card={card}
                key={card._id}
                deleteCard={(_id) => this.props.deleteOneCardThunk(_id)}
                handleToggleCheckCards={this.props.toggleCheckCard}
                isAnyCardChecked={checkedCards.size}
                isChecked={checkedCards.has(card._id)}
                toggleOpenModal={this.props.toggleOpenModal}
                onEdit={this.toggleSetCardModal}
                toggleStatus={(card) => cardToggleStatus(card)}
            />
        });
        return (
            <section className='container'>
                <div className={editableCard || isOpenModal || isOpenConfirm ? 'filter' : "noFilter"}>
                    <h1>This is ToDo List</h1>
                    <Search />
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
                        onSubmit={(data) => this.props.addCardThunk(data)}
                    />
                }
                {
                    editableCard && <Modal
                        onHide={this.toggleSetCardModal}
                        onSubmit={(editedCard) => this.props.editCardThunk(editedCard, 'todo')}
                        editableCard={editableCard}
                    />
                }
                {
                    isOpenConfirm && <Confirm
                        deleteCard={() => this.props.deleteAllCheckedCardThunk(checkedCards)}
                        countOrCardTitle={isCheckedCard ? isCheckedCard.title : checkedCards.size}
                        onHide={this.props.closeConfirmModal}
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
    const {
        cards,
        isOpenModal,
        isOpenConfirm,
        checkedCards,
        deleteCardId,
        editableCard,
        isCheckedCard
    } = state.todoState;
    return {
        cards,
        editableCard,
        isOpenModal,
        isOpenConfirm,
        checkedCards,
        deleteCardId,
        isCheckedCard,
        loading: state.globalState.loading
    }
};
const mapDispatchToProps = {
    getCardThunk,
    addCardThunk,
    deleteOneCardThunk,
    deleteAllCheckedCardThunk,
    editCardThunk,
    toggleOpenModal,
    toggleOpenConfirm,
    toggleSetCard,
    toggleCheckedAll,
    toggleCheckCard,
    cardToggleStatus,
    closeConfirmModal
};

export default connect(mapStateToProps, mapDispatchToProps)(Todo)