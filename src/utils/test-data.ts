export const NON_NUMERIC_REGEX = /[^0-9.]/g;
export const VALID_PASSWORD = 'secret_sauce';
export const users = {
    valid: {
        username: 'standard_user',
        password: VALID_PASSWORD
    },

    locked_out: {
        username: 'locked_out_user',
        password: VALID_PASSWORD
    },

    invalid: {
        username: 'invalid_user',
        password: 'invalid_password'
    },

    empty: {
        username: '',
        password: ''
    },

    emptyPassword: {
        username: 'standard_user',
        password: ''
    }
};

export const sortOptions = {
    'Name (A to Z)': 'az',
    'Name (Z to A)': 'za',
    'Price (low to high)': 'lohi',
    'Price (high to low)': 'hilo'
};
