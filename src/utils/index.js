export const isMobile = window.innerWidth < 760;

const perUnitCharges = [
  {
    date: new Date("1 Oct 2015"), // arbitrary date
    unit: 7.5
  },
  {
    date: new Date("1 Oct 2019"),
    unit: 8.5
  }
];

export const getUnitRate = date => {
  for (let i = perUnitCharges.length - 1; i >= 0; i--) {
    if (perUnitCharges[i].date < new Date(date)) return perUnitCharges[i].unit;
  }
};

export const getPreviousReading = lease => {
  return lease.lastPayment && lease.lastPayment.reading
    ? lease.lastPayment.reading
    : lease.initialReading;
};
