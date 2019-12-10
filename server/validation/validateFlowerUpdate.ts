import isEmpty from 'is-empty';

const validateFlowerUpdate = (data: any) => {
    const errors: any = {};
    data.comname = !isEmpty(data.comname) ? data.comname : '';
    data.column = !isEmpty(data.column) ? data.column : '';

    if (isEmpty(data.comname)) {
        errors.comname = 'Cannot have an empty comname.';
    }

    if (!(['GENUS', 'SPECIES', 'COMNAME'].includes(data.column.toUpperCase()))) {
        errors.column = 'You must enter a valid column name.';
    }

    return {
        errors,
        valid: isEmpty(errors)
    };
};

export default validateFlowerUpdate;
