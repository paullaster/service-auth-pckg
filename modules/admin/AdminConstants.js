export default {
  admin_settings: "admin/settings",
  user_settings: "admin/users",
  update_settings: "admin/updateSettings",
  update_user: (id) => `admin/updateUser/${id}`,
  delete_user: (id) => `admin/deleteUser/${id}`,
  send_activation_link: "admin/sendActivationLink",
};
