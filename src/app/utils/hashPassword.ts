import bcrypt from 'bcrypt';

export async function hashPassword(password: string) {
  let hashedPassword = '';

  await bcrypt.hash(password, 10)
    .then(hash => {
      hashedPassword = hash;
    })
    .catch(err => console.error(err));

  return hashedPassword;
}
