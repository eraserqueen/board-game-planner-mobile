import moment from 'moment';


const formatDate = (str) => {
    if(str == '') {
        return '';
    }
    const date = moment(str);
    if(!date.isValid) {
        return;
    }
    return date.format('ddd D MMMM');
};

const formatDateTime = (str) => {
    if(str == '') {
        return '';
    }
    const date = moment(str);
    if(!date.isValid) {
        return;
    }
    return date.format('ddd D MMMM HH:mm');
};

const formatTimeRange = (strFrom, strTo) => {
    const from = moment(strFrom);
    if(!from.isValid) {
        return;
    }
    const to = moment(strTo);
    if(!to.isValid) {
        return;
    }
    let nextDaySuffix = '';
    if(to.format('D')>from.format('D')){
       nextDaySuffix = ' the next day';
    }
    return 'From '+from.format('HH:mm')+' to '+to.format('HH:mm')+nextDaySuffix;
};

export {
    formatDate,
    formatDateTime,
    formatTimeRange
}