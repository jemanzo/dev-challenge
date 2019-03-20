import { gql } from 'apollo-boost';
import { USER_FULL, USER_BASIC2 } from './user';
import { COMPANY_FULL, COMPANY_BASIC2 } from './company';

export const QRY_USER_FULL = gql`
  query userDetails($id: ID!) {
    user(id: $id) { ${USER_FULL} }
  }
`;

export const QRY_COMPANY_FULL = gql`
  query companyDetails($id: ID!) {
    company(id: $id) { ${COMPANY_FULL} }
  }
`;

export const QRY_USERS = gql`
  query Users($after: String) {
    users(limit: 50, after: $after) { ${USER_BASIC2} }
  }
`;

export const QRY_COMPANIES = gql`
  query Companies($after: String) {
    companies(limit: 50, after: $after) { ${COMPANY_BASIC2} }
  }
`;
