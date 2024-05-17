export const formatDate = (date) => {
    const dateFormatted = date.split('T');
    return dateFormatted[0].split('-').reverse().join('-');
};