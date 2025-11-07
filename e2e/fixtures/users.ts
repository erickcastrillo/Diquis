export function generateTestEmail(prefix: string = "test"): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `${prefix}-${timestamp}-${random}@example.com`;
}

export const VALID_USER_DATA = {
  player: {
    first_name: "John",
    last_name: "Doe",
    role: "player",
    password: "SecurePass123!",
  },
  parent: {
    first_name: "Jane",
    last_name: "Smith",
    role: "parent",
    password: "SecurePass123!",
  },
  coach: {
    first_name: "Mike",
    last_name: "Johnson",
    role: "coach",
    password: "SecurePass123!",
    phone: "+1234567890",
  },
  staff: {
    role: "staff",
    password: "SecurePass123!",
  },
} as const;

export const INVALID_PASSWORDS = {
  too_short: "Short1!",
  no_uppercase: "lowercase123!",
  no_lowercase: "UPPERCASE123!",
  no_digit: "PasswordNoDigit!",
  no_special: "Password1234",
  common: "Password123!",
} as const;

export function generateUserData(
  role: keyof typeof VALID_USER_DATA,
  overrides: Partial<(typeof VALID_USER_DATA)[typeof role]> = {}
) {
  const baseData = VALID_USER_DATA[role];
  return {
    email: generateTestEmail(role),
    ...baseData,
    ...overrides,
  };
}
