import bcrypt from "bcrypt";

const generatePassword = async (plainPassword) => {
   try{
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(plainPassword, salt);
      return password;
   }catch(err){
      throw err;
   }
}

const validatePassword = async (plainPassword, hashedPassword) => {
   try{
      const result = await bcrypt.compare(plainPassword, hashedPassword);
      return result;
   }catch(err){
      throw err;
   }
}

export {generatePassword, validatePassword};