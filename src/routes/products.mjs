import { signedCookie } from "cookie-parser";
import { Router } from "express";

const router = Router();


// router.get("/api/products", (request, response) => {
//     console.log(request.headers.cookie);
//     console.log(request.cookies);
//     if (request.cookies.hello && request.cookies.hello === 'world')
//         return response.send([{ id : 101, name: "App", day: 7}]);
//     return response.status(403)
//     .send({msg:"Sorry. You need the correct cookie"});
// });


router.get("/api/products", (request, response) => {
    console.log(request.headers.cookie);
    console.log(request.cookies);
    console.log(request.signedCookies.ThisIsCookie);
    // Check if the cookie is set
    if (
    //   request.cookies.ThisIsCookie &&
    //   request.cookies.ThisIsCookie === "Example"
        request.signedCookies.ThisIsCookie &&
        request.signedCookies.ThisIsCookie === "Example"
    ) {
      return response.send([{ id: 101, name: "App", day: 7 }]);
    }
    return response.status(403)
    .send({ msg: "Sorry. You need the correct cookie" });
});

export default router;