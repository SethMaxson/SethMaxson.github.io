export const userController = {
    left: false,
    right: false,
    up: false,
    down: false,
    jump: false,
    attack: false,
    sprint: false,
    pause: false,
    interact: false
};
export const bindKeyHandlers = () => {
    window.onkeydown = (e) => {
        if (e.repeat)
            return;
        if (e.key === "a")
            userController.left = true;
        if (e.key === "d")
            userController.right = true;
        if (e.key === "w")
            userController.up = true;
        if (e.key === "s")
            userController.down = true;
        if (e.key === "l")
            userController.jump = true;
        if (e.key === "k")
            userController.attack = true;
        if (e.key === "j")
            userController.sprint = true;
        if (e.key === ";")
            userController.interact = true;
        if (e.key === "Escape")
            userController.pause = true;
    };
    window.onkeyup = (e) => {
        if (e.repeat)
            return;
        if (e.key === "a")
            userController.left = false;
        if (e.key === "d")
            userController.right = false;
        if (e.key === "w")
            userController.up = false;
        if (e.key === "s")
            userController.down = false;
        if (e.key === "l")
            userController.jump = false;
        if (e.key === "k")
            userController.attack = false;
        if (e.key === "j")
            userController.sprint = false;
        if (e.key === ";")
            userController.interact = false;
        if (e.key === "Escape")
            userController.pause = false;
    };
};
//# sourceMappingURL=controller.js.map