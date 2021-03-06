export const checkMatchingUser = (user, eachUser) => {
  return user && eachUser && user.username === eachUser.username;
};

export const formatDate = (created_at) => {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  const date = new Date(created_at).toLocaleDateString('en-UK', options);

  return date;
};
