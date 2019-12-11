import isEmpty from 'is-empty';

const validateSightingInsert = (data: any) => {
    console.log(data)
    const errors: any = {};
    data.name = !isEmpty(data.name) ? data.name : '';
    // data.column = !isEmpty(data.column) ? data.column : '';

    if (isEmpty(data.name)) {
        errors.name = 'Cannot have an empty comname.';
    }

    // if (!(['NAME', 'PERSON', 'LOCATION', 'SIGHTED'].includes(data.column.toUpperCase()))) {
    //     errors.column = 'You must enter a valid column name.';
    // } else if (data.column.toUpperCase() === 'SIGHTED' && !isNaN(Date.parse(data.value))) {
    //     errors.column = 'Value for SIGHTED column is an invalid date.'
    // }

    return {
        errors,
        valid: isEmpty(errors)
    };
};

export default validateSightingInsert;