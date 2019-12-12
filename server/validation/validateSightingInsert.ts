import isEmpty from 'is-empty';

const validateSightingInsert = (data: any) => {
    console.log(data)
    const errors: any = {};
    data.flower = !isEmpty(data.flower) ? data.flower : '';
    data.member = !isEmpty(data.member) ? data.member : '';
    data.location = !isEmpty(data.location) ? data.location : '';
    data.date = !isEmpty(data.date) ? data.date : '';

    // console.log(data.flower);
    // console.log(data.member);
    // console.log(data.location);
    // console.log(data.date);

    if (isEmpty(data.flower) || isEmpty(data.member) || isEmpty(data.location) || isEmpty(data.date)) {
        errors.name = 'Cannot have an empty comname.';
        console.log('something was empty...')
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