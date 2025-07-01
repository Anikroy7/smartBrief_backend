import { Router } from "express";
import { UsersRoutes } from "../app/modules/user/user.route";
import { AuthRoutes } from "../app/modules/auth/auth.route";
import { SummaryRoutes } from "../app/modules/summary/summary.route";



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
  {
    path: "/summary",
    route: SummaryRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
