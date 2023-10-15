import PropTypes from 'prop-types';

export const ButtonLink = ({ children,...rest }) => {
  return (
    <button
        className=" mt-5 text-neutral border-secondary border-2 px-10 font-bold hover:scale-105 hover:bg-secondary transition-all ease-in-out py-3 rounded-full "
        {...rest}
    >{children}</button>
  )
}

ButtonLink.propTypes = {
    children: PropTypes.node.isRequired,
    url: PropTypes.string.isRequired
}