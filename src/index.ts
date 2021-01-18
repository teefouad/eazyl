let permissions: any = {};

const createRole = (role: string) => {
  const can = (action: string) => {
    if (!permissions[role]) permissions[role] = true;

    return (target: string) => {
      if (permissions[role] === true || permissions[role] === undefined) permissions[role] = {};
      if (!permissions[role][action]) permissions[role][action] = {};

      permissions[role] = {
        ...permissions[role],
        [action]: {
          ...permissions[role][action],
          [target]: true,
        },
      };

      return {
        can,
        when: (conditions: Function | Function[]) => {
          permissions[role][action][target] = conditions;
        },
      };
    };
  };

  return {
    can,
  };
};

const testRole = (role: string) => {
  const can = (action: string) => {
    if (typeof permissions[role] === 'boolean') return permissions[role];

    return (target: string) => {
      const conditions = (
        permissions[role]?.[action]?.[target]
        || permissions[role]?.['*']?.[target]
        || permissions[role]?.[action]?.['*']
        || permissions[role]?.['*']?.['*']
      );

      if (typeof conditions === 'boolean') {
        return conditions;
      }

      if (typeof conditions === 'undefined') {
        return false;
      }

      return {
        with: (...args: any[]) => {
          if (typeof conditions === 'function') {
            return conditions(...args);
          }

          if (Array.isArray(conditions)) {
            return conditions.every(condition => condition(...args));
          }

          return false;
        },
      };
    };
  };

  return {
    can,
  };
};

const deleteRole = (role: string) => {
  delete permissions[role];
};

const deleteAllRoles = () => {
  permissions = {};
};

export const a = createRole;
export const an = createRole;
export const checkIf = testRole;
export const remove = deleteRole;
export const removeAll = deleteAllRoles;

export default createRole;
