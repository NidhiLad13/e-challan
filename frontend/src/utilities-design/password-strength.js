// has number
const hasNumber = (number) => new RegExp(/[0-9]/).test(number);

// has mix of small and capitals
const hasMixed = (number) => new RegExp(/[a-z]/).test(number) && new RegExp(/[A-Z]/).test(number);

// has special chars
const hasSpecial = (number) => new RegExp(/[!#@$%^&*)(+=._-]/).test(number);

// set color based on password strength
export const strengthColor = (count) => {
    if (count < 2) return { label: 'Poor', color: 'red', width: '30%' };
    if (count < 3) return { label: 'Weak', color: 'orange', width: '40%' };
    if (count < 4) return { label: 'Normal', color: 'orange', width: '50%' };
    if (count < 5) return { label: 'Good', color: '#00e600', width: '70%' };
    if (count < 6) return { label: 'Strong', color: '#006600', width: '90%' };
    return { label: 'Poor', color: 'red' };
};

// password strength indicator
export const strengthIndicator = (number) => {
    let strengths = 0;
    if (number.length > 5) strengths += 1;
    if (number.length > 7) strengths += 1;
    if (hasNumber(number)) strengths += 1;
    if (hasSpecial(number)) strengths += 1;
    if (hasMixed(number)) strengths += 1;
    return strengths;
};
