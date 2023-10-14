import { Link } from "react-router-dom"
import PropTypes from 'prop-types';

export const ButtonLink = ({ children, url }) => {
  return (
    <Link
        to={url}
        className=""
    >{children}</Link>
  )
}

ButtonLink.propTypes = {
    children: PropTypes.node.isRequired,
    url: PropTypes.string.isRequired
}