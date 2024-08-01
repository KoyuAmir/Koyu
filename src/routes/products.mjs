import { Router } from "express";

const router = Router();


router.get("/api/products", (request, response) => {
    response.send([{ id : 101, name: "App", day: 7}]);
});
export default router;