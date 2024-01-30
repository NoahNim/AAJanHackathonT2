const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User } = require("../../db/models");
const router = express.Router();

const validateLogin = [
    check("credential")
        .exists({ checkFalsy: true })
        .withMessage("Please provide a valid username."),
    check("password")
        .exists({ checkFalsy: true })
        .withMessage("Please provide a valid password."),
    handleValidationErrors,
];

//Log in
router.post(
    '/login',
    validateLogin,
    asyncHandler(async (req, res, next) => {
        const { credential, password } = req.body

        const user = await User.login({ credential, password });

        if (!user) {
            const err = new Error('Login failed');
            err.status = 401;
            err.title = 'Login failed';
            err.errors = [`The provided credentials were invalid.`];
            return next(err);
        }

        const token = await setTokenCookie(res, user);


        return res.json({
            user: user.toSafeObject(),
            token
        });
    }),
);

// 

router.delete(
    '/',
    (_req, res) => {
        res.clearCookie('token');
        res.clearCookie('user');
        return res.json({ message: 'success' });
    }
);

// Restore session user
router.get(
    '/',
    restoreUser,
    asyncHandler(async (req, res) => {
        const { user } = req;
        if (user) {

            const token = await setTokenCookie(res, user)

            const safeUser = user.toSafeObject()

            return res.json({
                user: safeUser,
                token: token,
            });
        } else return res.json({});
    })
);

// Get user profile
router.get(':id(\\d+)', asyncHandler(async (req, res) => {
    const userId = req.params.id

    const userData = await User.findAll({
        where: {
            id: parseInt(userId)
        }
    })

    return res.json({ userData })
})
)

module.exports = router;