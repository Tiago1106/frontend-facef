export function cpfMask(value: string): string {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1-$2');
}

export function currentMask(value: string): string {
  return value.replace(/\D/g, '').replace(/(\d)(\d{2})$/, '$1.$2');
  // .replace(/(?=(\d{3})+(\D))\B/g, '.');
}

export function celPhoneMask(value: string): string {
  return value
    .replace(/^(\d{2})(\d)/, '($1)$2')
    .replace(/(\d{5})(\d)/, '$1-$2');
}

export function dateMask(value: string): string {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2');
}

export function hourMask(value: string): string {
  return value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1:$2');
}
