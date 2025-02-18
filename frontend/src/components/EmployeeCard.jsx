
import PropTypes from 'prop-types';

const EmployeeCard = ({employee}) => {
    return (
        <div className="max-w-60 border-2 border-black rounded-lg shadow-lg relative hover:bg-gray-200 hover:z-10 hover:scale-105 transition-transform duration-300">
            <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">{employee.name}</h2>
                <p className="text-gray-600 mt-2">
                    {employee.number}
                </p>
                <p className="text-gray-600 mt-2">
                    {employee.address}
                </p>          
            </div>
        </div>
    );
}

EmployeeCard.propTypes = {
    employee: PropTypes.shape({
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
    }).isRequired,
};

export default EmployeeCard;

