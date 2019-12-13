import isEmpty from 'is-empty';

const validateFlowerUpdate = (data: any) => {
    const errors: any = {};
    data.genus = !isEmpty(data.genus) ? data.genus : '';
    data.species = !isEmpty(data.species) ? data.species : '';
    data.selected = !isEmpty(data.selected) ? data.selected : '';

    if (isEmpty(data.genus) || isEmpty(data.species) || isEmpty(data.selected)) {
        errors.entry = 'Cannot have an empty comname.';
    }

    return {
        errors,
        valid: isEmpty(errors)
    };
};

export default validateFlowerUpdate;
