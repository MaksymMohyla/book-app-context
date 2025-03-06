export function formatDate() {
  const date = new Date();

  const day = date.getDate();

  const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(
    date
  );
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');

  const hours12 = hours % 12 || 12;
  const period = hours < 12 ? 'am' : 'pm';

  const formattedDate = `${day} ${month} ${year}, ${hours12}.${minutes}${period}`;

  return formattedDate;
}
