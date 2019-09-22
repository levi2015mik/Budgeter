
export default function validate(value) {
    let errors = {};
    if(isNaN(Number(value.price))){
        errors.price = "Must be number";
        errors._error = "Isn`t correct price!"
    }
    if(value.names&&!value.names.some(el=>el!=="")){
        errors.names = {_error:"At least one name must be imputed"};
        errors._error = "Name is uncorrected"
    }
    return errors;
}