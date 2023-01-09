import { useState } from "react"
import PropTypes from 'prop-types'
import React from "react"

const Togglable = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    function toggleVisible() {
        setVisible(!visible)
    }

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisible}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisible}>cancel</button>
            </div>

        </div>
    )
})

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

export default Togglable