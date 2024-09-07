export default {
  getChartData: "hrmis/company_structure",
  postOrgChart: "cu/hrmis_cu/HRMManager_setOrgChart",
  getp9: "hrmis/payroll/p9Report",
  contracts: (no) => `hrmis/contract?employeeNo=${no}`,
  contract: "hrmis/contract/get-contract",
  contractLetter: "hrmis/contract/contract-letter",
  rejectContract: "hrmis/contract/contract/reject",
  contractAcceptanceOTP: "hrmis/contract/contract/acceptance/otp",
  acceptContract: "hrmis/contract/contract/acceptance/send"
};
