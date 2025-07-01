import { Router } from "express";
import { UsersRoutes } from "../app/modules/user/user.route";



const router = Router();

const moduleRoutes = [

  {
    path: "/users",
    route: UsersRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
