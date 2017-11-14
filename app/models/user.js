"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserModel {
    getUsers(db) {
        return db('users as u')
            .select('u.user_id', 'u.is_active', 'u.username', 'u.first_name', 'u.last_name', 'ut.user_type_name')
            .leftJoin('user_types as ut', 'ut.user_type_id', 'u.user_type_id')
            .limit(10);
    }
    search(db, query) {
        let _query = '%' + query + '%';
        return db('users as u')
            .select('u.user_id', 'u.is_active', 'u.username', 'u.first_name', 'u.last_name', 'ut.user_type_name')
            .leftJoin('user_types as ut', 'ut.user_type_id', 'u.user_type_id')
            .where(w => {
            w.where('u.username', 'like', _query)
                .orWhere('u.first_name', 'like', _query)
                .orWhere('u.last_name', 'like', _query);
        })
            .limit(10);
    }
    removeUser(db, userId) {
        let sql = 'DELETE FROM users WHERE user_id=?';
        return db.raw(sql, [userId]);
    }
    getUserTypeList(db) {
        let subQuery = db('users as u')
            .whereRaw('u.user_type_id=ut.user_type_id')
            .count('*')
            .as('total');
        return db('user_types as ut')
            .select('ut.user_type_name', subQuery);
    }
    saveUser(db, user) {
        return db('users').insert(user);
    }
    updateUser(db, userId, user) {
        return db('users')
            .where('user_id', userId)
            .update(user);
    }
    getDetail(db, userId) {
        return db('users')
            .select('user_id', 'username', 'first_name', 'last_name', 'user_type_id', 'is_active')
            .where('user_id', userId);
    }
}
exports.UserModel = UserModel;
class UserTypeModel {
    getUserTypeList(db) {
        return db('user_types').orderBy('user_type_name', 'DESC');
    }
}
exports.UserTypeModel = UserTypeModel;
//# sourceMappingURL=user.js.map