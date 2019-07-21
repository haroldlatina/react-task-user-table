import React from 'react';
import PropTypes from 'prop-types';

const Container = ({ title, children }) => {
    return (
        <div className="container">
            <div className="container-title">
                {title}
            </div>
            <div className="container-content">
                {children}
            </div>
        </div>
    );
}

Container.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.element
};

export default Container;
