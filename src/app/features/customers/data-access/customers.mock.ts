import { TEAM_MEMBERS } from '../../../shared/data/team-members';
import { CUSTOMER_COUNTRIES } from '../models/customer-countries';
import { CustomerPlan } from '../models/customer-plan.enum';
import { CustomerStatus } from '../models/customer-status.enum';
import type { ICustomer } from '../models/customer.interface';

const COMPANIES: readonly string[] = [
  'Acme Corporation',
  'Globex Inc.',
  'Soylent Corp.',
  'Initech',
  'Umbrella Labs',
  'Hooli',
  'Stark Industries',
  'Wayne Enterprises',
  'Wonka Foods',
  'Cyberdyne Systems',
  'Tyrell Robotics',
  'Aperture Science',
  'Black Mesa Research',
  'Massive Dynamic',
  'Vandelay Industries',
  'Pied Piper',
  'Gringotts Finance',
  'Oscorp Technologies',
  'Dunder Mifflin',
  'Sterling Cooper',
  'Bluth Company',
  'Prestige Worldwide',
  'Nakatomi Trading',
  'Monsters Inc.',
  'Los Pollos Group',
  'Rekall Travel',
  'Duff Beverages',
  'Krusty Media',
  'Planet Express',
  'Genco Imports',
  'Weyland Logistics',
  'Spacely Sprockets',
  'Pendant Publishing',
  'Zorg Industries',
  'Virtucon',
  'Brawndo Beverages',
];

const CONTACTS: readonly string[] = [
  'Anna Brooks',
  'Tomasz Nowak',
  'Julia Martin',
  'Peter Schmidt',
  'Laura Rossi',
  'Marek Zielinski',
  'Olivia Grant',
  'Daniel Weber',
  'Sofia Alvarez',
  'Jan Kowalski',
  'Emma Dubois',
  'Lucas de Vries',
];

const PLAN_CYCLE: readonly CustomerPlan[] = [
  CustomerPlan.PRO,
  CustomerPlan.ENTERPRISE,
  CustomerPlan.FREE,
  CustomerPlan.PRO,
  CustomerPlan.PRO,
  CustomerPlan.ENTERPRISE,
];

const STATUS_CYCLE: readonly CustomerStatus[] = [
  CustomerStatus.ACTIVE,
  CustomerStatus.ACTIVE,
  CustomerStatus.TRIAL,
  CustomerStatus.ACTIVE,
  CustomerStatus.AT_RISK,
  CustomerStatus.ACTIVE,
  CustomerStatus.CHURNED,
  CustomerStatus.TRIAL,
  CustomerStatus.ACTIVE,
  CustomerStatus.AT_RISK,
];

const BASE_MRR: Record<CustomerPlan, number> = {
  [CustomerPlan.FREE]: 0,
  [CustomerPlan.PRO]: 490,
  [CustomerPlan.ENTERPRISE]: 4200,
};

const HOUR_IN_MS = 60 * 60 * 1000;
const LAST_ACTIVITY_BASE = Date.UTC(2025, 4, 18, 10, 0, 0);
const CREATED_AT_BASE = Date.UTC(2023, 0, 9, 9, 0, 0);

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '')
    .slice(0, 16);
}

function createCustomer(company: string, index: number): ICustomer {
  const contactName = CONTACTS[index % CONTACTS.length];
  const plan = PLAN_CYCLE[index % PLAN_CYCLE.length];
  const status = STATUS_CYCLE[index % STATUS_CYCLE.length];
  const isChurned = status === CustomerStatus.CHURNED;

  return {
    id: `CUS-${1001 + index}`,
    company,
    contactName,
    email: `${contactName.split(' ')[0].toLowerCase()}@${toSlug(company)}.com`,
    country: CUSTOMER_COUNTRIES[index % CUSTOMER_COUNTRIES.length],
    plan,
    status,
    owner: TEAM_MEMBERS[index % TEAM_MEMBERS.length],
    openCases: isChurned ? 0 : (index * 7) % 9,
    mrr: isChurned ? 0 : BASE_MRR[plan] + (index % 5) * 120,
    lastActivityAt: new Date(LAST_ACTIVITY_BASE - index * (isChurned ? 240 : 37) * HOUR_IN_MS).toISOString(),
    createdAt: new Date(CREATED_AT_BASE + index * 19 * 24 * HOUR_IN_MS).toISOString(),
  };
}

export const CUSTOMERS_MOCK_DATA: readonly ICustomer[] = COMPANIES.map(createCustomer);
