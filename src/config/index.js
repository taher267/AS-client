export const DASHBOARD_PATH = `/dashboard`;
export const HOME_PATH = DASHBOARD_PATH;
export const SIGNUP_PATH = `/signup`;
export const SIGNIN_PATH = `/signin`;
export const USER_PATH = `/users`;
export const ESTABLISHMENT_PATH = `/establishments`;
export const DEPARTMENT_PATH = `/departments`;
export const HOLIDAY_PATH = `/holidays`;
export const REPORT_PERMISSION_PATH = `/report-permissions`;
export const WORK_REPORT_PATH = `/work-reports`;
export const REPORT_FORM_PATH = `/report-forms`;
export const REPORT_FORM_SUBMISSION_PATH = `/submission`;
// export const FORM_PERMISSION_PATH = `/forms-permissions`;
export const NEW_PATH = `/new`;
export const UPDATE_PATH = `/update`;
export const ADMIN_ROLES = ["super_admin", "admin"];
export const USER_ROLES = ["user"];
export const OBSERVER_ROLES = ["observer"];
export const ROLES = [...ADMIN_ROLES, ...USER_ROLES];
export const UPDATABLE_ROLES = [
  ADMIN_ROLES[1],
  ...OBSERVER_ROLES,
  ...USER_ROLES,
];
export const USER_STATUSES = ["active", "inactive", "pending", "close"];
export const WORK_REPORT_STATUSES = [
  "submited",
  "on-review",
  "approved",
  "rejected",
];

export const AUTH_PATHS = [SIGNIN_PATH, SIGNIN_PATH];
