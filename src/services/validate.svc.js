function email(email){

    if(email.lastIndexOf("@")<0 || email.lastIndexOf(".")<0){
        return false;
    }

    let name = email.substring(0, email.lastIndexOf("@"));
    let host = email.substring(email.lastIndexOf("@") +1, email.lastIndexOf("."));
    let ext  = email.substring(email.lastIndexOf(".")+1);
    
    return (name && host && ext) ? true : false;
}

function phone(phone){
    phone = phone.replace(/\s/g, '');
    return !isNaN(phone);
}

function isInvalid(data){

    let invalidData = [];

    if(!data.email || !email(data.email)) invalidData.push('email');
    if(!data.phone || !phone(data.phone)) invalidData.push('phone');

    return invalidData.length > 0 ? invalidData : false;
}


module.exports = {
    email:      email,
    phone:      phone,
    isInvalid:  isInvalid
};