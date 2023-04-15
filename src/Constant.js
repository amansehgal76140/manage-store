const baseUrl = "http://stock.staging.digitalregister.in:8080";
const businessId = "kbktbFmdvENXoEriN0UD7VboJET2";
const storeId = "b78a77e4-5063-4810-b8cb-0de1b9c3f099";
const storeAdminPermissions = [
  "View all entries and download reports",
  "Add, edit, delete any type of entry",
  "View total Sale Purchase",
  "View All Added Items add new item edit them delete them",
];

const salePurchaseOperatorPermissions = [
  "View Opening Stock remaining stock of all items",
  "Add sale and purchase entry, stock in/out entry",
  "Add new Party",
  "View Added Sale Bill and share to party",
];

const salesOpertaorPermissions = [
  "View Opening Stock remaining stock of all items",
  "Add sale  entry, stock out entry",
  "Add new Party",
  "View Added Sale Bill and share to party",
];

export {
  baseUrl,
  businessId,
  storeId,
  storeAdminPermissions,
  salePurchaseOperatorPermissions,
  salesOpertaorPermissions,
};
