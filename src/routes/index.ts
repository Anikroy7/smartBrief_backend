import { Router } from "express";
import { UsersRoutes } from "../app/modules/user/user.route";
import { AuthRoutes } from "../app/modules/auth/auth.route";



const router = Router();

const moduleRoutes = [

  {
    path: "/users",
    route: UsersRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
