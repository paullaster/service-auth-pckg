import authService from "../AuthService";
export default function auth({ next, router }) {
  if (!authService.check()) {
    return router.push({ name: "login" });
  }
  return next();
}
