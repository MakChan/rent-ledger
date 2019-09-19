import { gql } from "apollo-boost";

export const LOG_IN = gql`
  mutation LogIn($username: String!, $password: String!) {
    logIn(username: $username, password: $password) {
      token
      user {
        _id
        username
        landlord {
          _id
          name
        }
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($name: String!, $username: String!, $password: String!) {
    createUser(name: $name, username: $username, password: $password) {
      token
      user {
        _id
        username
        landlord {
          _id
          name
        }
      }
    }
  }
`;

export const ADD_PAYMENT = gql`
  mutation createPayment($payment: PaymentInput!, $leaseId: String!) {
    createPayment(payment: $payment, leaseId: $leaseId) {
      reading
      balance
    }
  }
`;

export const ADD_TENANT = gql`
  mutation addTenant($lease: LeaseInput!, $tenant: TenantInput!) {
    createTenantWithLease(lease: $lease, tenant: $tenant) {
      _id
      rent
      room
    }
  }
`;
