import bcrypt from 'bcrypt';

export function hashPassword(password: string) {
	// const saltRounds = 10
	const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

export function validatePassword(password: string, hashedPassword: string) {
	return bcrypt.compareSync(password, hashedPassword);
}
