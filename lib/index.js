"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.removeAll = exports.remove = exports.checkIf = exports.an = exports.a = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var permissions = {};

var createRole = function createRole(role) {
  var can = function can(action) {
    if (!permissions[role]) permissions[role] = true;
    return function (target) {
      if (permissions[role] === true || permissions[role] === undefined) permissions[role] = {};
      if (!permissions[role][action]) permissions[role][action] = {};
      permissions[role] = _objectSpread({}, permissions[role], (0, _defineProperty2["default"])({}, action, _objectSpread({}, permissions[role][action], (0, _defineProperty2["default"])({}, target, true))));
      return {
        when: function when(conditions) {
          permissions[role][action][target] = conditions;
        }
      };
    };
  };

  return {
    can: can
  };
};

var testRole = function testRole(role) {
  var can = function can(action) {
    if (typeof permissions[role] === 'boolean') return permissions[role];
    return function (target) {
      var conditions = permissions[role] && permissions[role][action] && permissions[role][action][target];

      if (typeof conditions === 'boolean') {
        return conditions;
      }

      if (typeof conditions === 'undefined') {
        return false;
      }

      return {
        "with": function _with() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          if (typeof conditions === 'function') {
            return conditions.apply(void 0, args);
          }

          if (Array.isArray(conditions)) {
            return conditions.every(function (condition) {
              return condition.apply(void 0, args);
            });
          }

          return false;
        }
      };
    };
  };

  return {
    can: can
  };
};

var deleteRole = function deleteRole(role) {
  delete permissions[role];
};

var deleteAllRoles = function deleteAllRoles() {
  permissions = {};
};

var a = createRole;
exports.a = a;
var an = createRole;
exports.an = an;
var checkIf = testRole;
exports.checkIf = checkIf;
var remove = deleteRole;
exports.remove = remove;
var removeAll = deleteAllRoles;
exports.removeAll = removeAll;
var _default = createRole;
exports["default"] = _default;