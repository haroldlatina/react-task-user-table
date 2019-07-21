import React from 'react';
import { FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';

const TextField = props => {
    return <FormControl
        name="text"
        type="search"
        placeholder="Search by name"
        onChange={props.onChange}
    />
}

TextField.propTypes = {
    onChange: PropTypes.func.isRequired,
};

export default TextField;
