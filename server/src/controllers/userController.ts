import { updateUser, User } from "../models/user";

module.exports = {
    updateLastLogin: (id: typeof User._id) => {
        const date = new Date();
        updateUser({_id: id}, {lastLogin: date});
    }
};