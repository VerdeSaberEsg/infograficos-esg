export const formatDateTime = (iso: string): string => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return 'indisponível';
  }
  return date.toLocaleString('pt-BR', { timeZone: 'UTC' }) + ' UTC';
};

export const formatStatus = (status: string | undefined): string => {
  switch (status) {
    case 'ok':
      return 'OK';
    case 'irregular':
      return 'Irregular';
    default:
      return 'Desconhecido';
  }
};
