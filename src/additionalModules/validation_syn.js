export const validate_syn_param = (name) => {
    if (name !== '' && name !== null) {
        return true
    }
    else return false
}

export const validate_syn_qty = (qty) => {
    if (qty !== 'e' && qty > 0 && qty !== '') {
        // console.log(qty)
        return true
    }
    else return false
}

export const validate_syn_year = (year) => {
    if (Number(year)) {
        console.log(year)
        return true
    }
    else{
        return false
    }
}