import { APIRequestContext } from "@playwright/test";

export interface User {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  full_name: string;
  phone: string | null;
  role: string;
  created_at: string;
  updated_at: string;
  confirmed_at: string | null;
  locked_at: string | null;
  sign_in_count: number;
  versions?: AuditVersion[];
}

export interface AuditVersion {
  id: number;
  event: "create" | "update" | "destroy";
  whodunnit: string | null;
  created_at: string;
  changeset: Record<string, [any, any]>;
}

export async function getUser(
  request: APIRequestContext,
  userId: string | number
): Promise<User> {
  const response = await request.get(
    `http://localhost:3000/test_helpers/users/${userId}`
  );
  if (!response.ok()) {
    throw new Error(`Failed to fetch user ${userId}: ${response.status()}`);
  }
  return await response.json();
}

export async function cleanupUsers(
  request: APIRequestContext,
  emailPattern: string
): Promise<number> {
  const response = await request.delete(
    `http://localhost:3000/test_helpers/users/cleanup?email=${emailPattern}`
  );
  if (!response.ok()) {
    throw new Error(`Failed to cleanup users: ${response.status()}`);
  }
  const result = await response.json();
  return result.deleted;
}

export function validateAuditTrail(
  user: User,
  expectedEvents: Array<"create" | "update" | "destroy">
) {
  const events = user.versions?.map((v) => v.event) || [];
  if (events.length !== expectedEvents.length) {
    throw new Error(
      `Expected ${expectedEvents.length} audit events, got ${events.length}`
    );
  }
  expectedEvents.forEach((expected, index) => {
    if (events[index] !== expected) {
      throw new Error(
        `Expected event ${index} to be "${expected}", got "${events[index]}"`
      );
    }
  });
}

export interface Academy {
  id: string;
  name: string;
  subdomain: string;
  status: 'active' | 'inactive' | 'suspended';
  created_at: string;
  updated_at: string;
}

export async function createAcademy(request: APIRequestContext, name?: string): Promise<Academy> {
  const academyName = name || `Test Academy ${Date.now()}`;
  const response = await request.post('http://localhost:3000/test_helpers/academies', {
    data: {
      name: academyName,
      subdomain: academyName.toLowerCase().replace(/\s+/g, '-'),
      email: `${academyName.toLowerCase().replace(/\s+/g, '-')}@test.com`,
      status: 'active',
    },
  });

  if (!response.ok()) {
    throw new Error(`Failed to create academy: ${await response.text()}`);
  }
  return await response.json();
}
