type BaseOrganization = {
  name: string;
  phone: string;
  email: string;
  site_url?: string;
  address?: string;
};
export type OrganizationData = BaseOrganization & { id: number };
export type OrganizationCreateDTO = BaseOrganization;
export type OrganizationUpdateDTO = Partial<BaseOrganization>;
