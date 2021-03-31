import { getUser } from "./user";

export const checkRole = () => {
    const infoUser = getUser();
    const Role = [
        "order",
        "sale",
        "service",
        "manager",
        "director",
        "store",
        "accountant",
    ];
    const ACC_TYPE = infoUser && infoUser.acc_type;

    if (ACC_TYPE === "M") {
        return "M";
    }

    if (ACC_TYPE === "U") {
        if (infoUser.ID === 1) {
            return "ADMIN";
        } else {
            return "STAFF"
                //const groupRole = infoUser.GroupTitles;

            // const hasRole = Role.some(role => groupRole.includes(role));
            // console.log(hasRole);

            //const isRole = groupRole.includes("service");
            //return isRole ? "Service" : "Employee";
        }
    }
    return null;
}