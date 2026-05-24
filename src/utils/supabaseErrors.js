
export function translateSupabaseError(error) {
  const message = error?.message || error || '';

  const errors = {
    'For security purposes, you can only request this after':
    'Por segurança, aguarde alguns segundos antes de solicitar novamente.',
    'Invalid login credentials': 'Email ou senha inválidos.',
    'Email not confirmed': 'Confirme seu email antes de entrar.',
    'User already registered': 'Este email já está cadastrado.',
    'Password should be at least 6 characters': 'A senha precisa ter pelo menos 6 caracteres.',
    'Unable to validate email address: invalid format': 'Formato de email inválido.',
    'Signup is disabled': 'Cadastro desativado.',
    'Email rate limit exceeded': 'Muitas tentativas. Aguarde um momento.',
    'New password should be different from the old password': 'A nova senha deve ser diferente da antiga.',
    'User not found': 'Usuário não encontrado.',
    'Token has expired or is invalid': 'O link expirou ou é inválido.',
    'Invalid JWT': 'Sessão inválida. Faça login novamente.',
    'JWT expired': 'Sua sessão expirou. Entre novamente.',
    'Request failed with status code 400': 'Não foi possível concluir a solicitação.',
    'Password cannot be longer than 72 characters':
    'A senha não pode ter mais de 72 caracteres.'
  };

  return errors[message] || message;
}