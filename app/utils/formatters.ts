export const formatPhoneNumber = (phone: string): string => {
  const digits = phone.replace(/\D/g, "");

  const normalized = digits.length > 10 ? digits.slice(-10) : digits;

  const part1 = normalized.slice(0, 3);
  const part2 = normalized.slice(3, 6);
  const part3 = normalized.slice(6, 8);
  const part4 = normalized.slice(8, 10);

  return `+7(${part1})${part2}-${part3}-${part4}`;
};
