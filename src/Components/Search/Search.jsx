import styles from './search.module.css'
import { Navbar, DropdownButton, Dropdown, Form, Button, Nav, FormControl } from "react-bootstrap";
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import { getCardThunk } from '../../Redux/requestAction'
import {
    setFilterValue,
    changeSearchValue,
    setSearchDate
} from '../../Redux/simpleAction'
const filterItems = [
    {
        label: 'A-Z',
        value: 'a-z'
    },
    {
        label: 'Z-A',
        value: 'z-a'
    },
    {
        label: 'Creation Date Oldest',
        value: 'creation_date_oldest'
    },
    {
        label: 'Creation Date Newest',
        value: 'creation_date_newest'
    },
    {
        label: 'Completion Date Oldest',
        value: 'completion_date_oldest'
    },
    {
        label: 'Completion Date Newest',
        value: 'completion_date_newest'
    },
    {
        label: 'Reset',
        value: ''
    }
]
const statusItems = [
    {
        label: 'Done',
        value: 'done'
    },
    {
        label: 'Active',
        value: 'active'
    },
    {
        label: 'Reset',
        value: ''
    }

]
const Search = (props) => {

    const {

        filter,
        status,
        search,
        create_lte,
        create_gte,
        complete_lte,
        complete_gte,

        setFilterValue,
        changeSearchValue,
        setSearchDate,
        getCardThunk

    } = props;

    const filters = filterItems.map((item, index) => {
        return <Dropdown.Item
            key={index}
            onClick={() => setFilterValue('filter', item.value)}
        >
            {item.label}
        </Dropdown.Item>
    });

    const statusType = statusItems.map((item, index) => {
        return <Dropdown.Item
            key={index}
            onClick={() => setFilterValue('status', item.value)}
        >
            {item.label}
        </Dropdown.Item>
    })
    const handleSubmit = () => {
        const data = {};
        if (search) data.search = search;
        if (filter) data.filter = filter;
        if (status) data.status = status;
        if (create_lte) data.create_lte = create_lte;
        if (create_gte) data.create_gte = create_gte;
        if (complete_lte) data.complete_lte = complete_lte;
        if (complete_gte) data.complete_gte = complete_gte;
        getCardThunk(data)
    }
    return (
        <>
            <Navbar className={styles.Navbar} expand="md" sticky="top">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Form inline>
                        <FormControl
                            type="text"
                            placeholder="Search"
                            className="mr-sm-2"
                            onChange={(e) => changeSearchValue(e.target)}
                            name='search'
                            value={search}
                        />
                        <Button
                            variant="outline-dark"
                            onClick={handleSubmit}
                        >Search</Button>
                    </Form>
                    <Nav className="">
                        <DropdownButton
                            id="dropdown-basic-button"
                            title='Dates'
                        >
                            <Form className={styles.dateForm}>
                                <Form.Group controlId="formBasicEmail" style={{ display: 'flex', alignItems: 'center' }}>
                                    <Form.Label>Create Late</Form.Label>
                                    <DatePicker
                                        selected={create_lte}
                                        onChange={(date) => setSearchDate('create_lte', date)}
                                        className='datapicker'
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail" style={{ display: 'flex', alignItems: 'center' }}>
                                    <Form.Label>Create Greater</Form.Label>
                                    <DatePicker
                                        selected={create_gte}
                                        onChange={(date) => setSearchDate('create_gte', date)}
                                        className='datapicker'
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail" style={{ display: 'flex', alignItems: 'center' }}>
                                    <Form.Label>Completed Late</Form.Label>
                                    <DatePicker
                                        selected={complete_lte}
                                        onChange={(date) => setSearchDate('complete_lte', date)}
                                        className='datapicker'
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail" style={{ display: 'flex', alignItems: 'center' }}>
                                    <Form.Label>Completed Greater</Form.Label>
                                    <DatePicker
                                        selected={complete_gte}
                                        onChange={(date) => setSearchDate('complete_gte', date)}
                                        className='datapicker'
                                    />
                                </Form.Group>
                            </Form>
                        </DropdownButton>
                        <DropdownButton
                            id="dropdown-basic-button"
                            title={filter ? filterItems.find(i => i.value === filter).label : 'Filter'}
                        >
                            {filters}
                        </DropdownButton>
                        <DropdownButton
                            id="dropdown-basic-button"
                            title={status ? statusItems.find(i => i.value === status).label : "Status"}
                        >
                            {statusType}
                        </DropdownButton>

                    </Nav>

                </Navbar.Collapse>
            </Navbar>

        </>
    )
}
const mapStateToProps = state => {
    const {
        filter,
        status,
        search,
        create_lte,
        create_gte,
        complete_lte,
        complete_gte
    } = state.searchState
    return {
        filter,
        status,
        search,
        create_lte,
        create_gte,
        complete_lte,
        complete_gte
    }
}
const mapDispatchToProps = {
    setFilterValue,
    changeSearchValue,
    setSearchDate,
    getCardThunk
}
export default connect(mapStateToProps, mapDispatchToProps)(Search)