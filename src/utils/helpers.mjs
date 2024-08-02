import bcrypt from 'bcrypt';

const saltRounds = 10; 

export const hashPassword = (password) => {
    if (!password) {
        console.error('Password is required but not provided');
        throw new Error('Password is required');
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    console.log(salt);
    return bcrypt.hashSync(password, salt);

}



export const comparePassword = (plain, hashed) => {
     return bcrypt.compareSync(plain, hashed);
};
   
