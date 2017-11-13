"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserModel {
    getUsers(db) {
        return db('users as u')
            .select('u.user_id', 'u.is_active', 'u.username', 'u.first_name', 'u.last_name', 'ut.user_type_name')
            .leftJoin('user_types as ut', 'ut.user_type_id', 'u.user_type_id')
            .limit(10);
    }
}
exports.UserModel = UserModel;
class UserTypeModel {
    getUsers(db) {
        return db('users as u')
            .select('u.user_id', 'u.username', 'u.first_name', 'u.last_name', 'ut.user_type_name')
            .leftJoin('user_types as ut', 'ut.user_type_id', 'u.user_type_id')
            .limit(10);
    }
}
exports.UserTypeModel = UserTypeModel;
//# sourceMappingURL=user.js.map