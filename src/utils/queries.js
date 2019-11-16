import { gql } from "apollo-boost";

export const GET_ROOMS = gql`
  query {
    rooms {
      _id
      roomNo
      currentLease {
        _id
        rent
        current
        tenant {
          name
        }
      }
    }
  }
`;

export const LEASE_WITH_PAYMENTS = gql`
  query LeaseWithPayments($leaseId: String!) {
    leaseWithPayments(_id: $leaseId) {
      _id
      rent
      initialReading
      date
      remark
      current
      extraCharges
      tenant {
        _id
        name
        phoneNumber
        aadharNumber
      }
      room {
        _id
        roomNo
      }
      payments {
        _id
        reading
        electricityCharges
        paidElectricityCharges
        totalPaid
        balance
        remark
        datePaid
      }
    }
  }
`;

export const GET_CURRENT_LEASES = gql`
  query {
    currentLeases {
      _id
      rent
      initialReading
      tenant {
        name
      }
      lastPayment {
        reading
        balance
      }
      room {
        roomNo
      }
    }
  }
`;

export const GET_ALL_PAYMENTS = gql`
  query {
    allPayments {
      _id {
        month
        year
      }
      id
      totalElectricity
      totalPaidElectricity
      totalPaid
      count
    }
  }
`;
