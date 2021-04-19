import { Form, Button } from 'react-bootstrap';
import React, { PureComponent } from 'react';
import styles from '../contact.module.css';
import Spinner from '../../../Spinner/Spinner';
import ContactFormModal from './ContactFormModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faCheckCircle, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import {
    changeValues,
    toggleOpenModal,
    closeAndReset
} from '../../../../Redux/simpleAction';
import { getValues } from '../../../../Redux/requestAction'
const forms = [
    {
        name: 'name',
        type: 'text',
        placeholder: 'Name',
        autoComplete: 'on'
    },
    {
        name: 'email',
        type: 'email',
        placeholder: 'Email',
        autoComplete: 'on'
    },
    {
        name: 'message',
        type: null,
        placeholder: 'Your Message',
        as: 'textarea',
        rows: 3,
    }
];
class Contact extends PureComponent {

    render() {
        const { formData, loading, isOpen } = this.props;
        const formGroup = forms.map((form, index) => {
            const errorMessage = formData[form.name].error;
            const inputValue = formData[form.name].value;
            return (
                <Form.Group
                    className={styles.formGroup}
                    key={index}
                >
                    <Form.Control
                        type={form.name}
                        placeholder={form.placeholder}
                        name={form.name}
                        value={inputValue}
                        onChange={(e) => this.props.changeValues(e.target)}
                        as={form.as || undefined}
                        rows={form.rows || undefined}
                        autoComplete={form.autoComplete}
                    />
                    <div>{inputValue === '' && !errorMessage ?
                        null : errorMessage ?
                            <div className={styles.tooltips}>
                                <FontAwesomeIcon
                                    className={styles.errorIcon}
                                    icon={faExclamationTriangle}
                                />
                                <div className={styles.errorTooltips}>
                                    {errorMessage}
                                    <FontAwesomeIcon
                                        className={styles.caret}
                                        icon={faCaretDown}
                                    />
                                </div>
                            </div>
                            :
                            <div>
                                <FontAwesomeIcon
                                    className={styles.validIcon}
                                    icon={faCheckCircle}
                                    style={{ color: 'green' }}
                                />
                            </div>
                    }
                    </div>
                </Form.Group>

            )
        });
        return (
            <div className={styles.formHolder}>
                <h1 className={styles.title}>Contact Form</h1>
                <div className={styles.formWrapper}>
                    <Form
                        onSubmit={(event) => event.preventDefault()}
                        className={styles.formBody}
                    >
                        <h2>Send Your Message</h2>
                        {formGroup}
                        <Button
                            className={styles.formGroupBtn}
                            type="submit"
                            onClick={() => this.props.getValues(formData)}
                            disabled={!formData.name.valid || !formData.email.valid || !formData.message.valid}
                        >
                            Send
                        </Button>
                    </Form>
                </div>
                {
                    isOpen && <ContactFormModal
                        onHide={this.props.closeAndReset}
                        name={formData.name.value}
                        email={formData.email.value}
                        message={formData.message.value}
                    />
                }
                {
                    loading && <Spinner />
                }

            </div>
        )
    }
}
const mapStateToProps = state => {
    const { name, email, message } = state.contactState
    return {
        formData: {
            name,
            email,
            message
        },
        loading: state.globalState.loading,
        isOpen: state.contactState.isOpen
    }
}
const mapDispatchToProps = {
    changeValues,
    getValues,
    toggleOpenModal,
    closeAndReset
}
export default connect(mapStateToProps, mapDispatchToProps)(Contact);