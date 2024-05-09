export const validateForm = ({name, email, message}:{
    name: string
    email: string
    message: string
}) =>{
    const errors: {name?: string; email?: string; message?: string} = {}
    if(!name || name.trim()===''){
        errors.name = 'Name is requierd';
    }

    if(!email || email.trim() === ''){
        errors.email = 'Email is requierd'
    } else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        errors.email= 'Invalid email address';
    }

    if(!message || message.trim() == ''){
        errors.email = 'Message is requierd';
    }
    return errors;
}