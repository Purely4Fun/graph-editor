"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/*eslint max-len: ["error", 200]*/
var _default = {
  GRAPH_NO_ID_PROP: "id prop not defined! id property is mandatory and it should be unique.",
  INVALID_LINKS: "you provided a invalid links data structure. Links source and target attributes must point to an existent node",
  INSUFFICIENT_DATA: "you have not provided enough data for react-d3-graph to render something. You need to provide at least one node",
  INVALID_LINK_VALUE: "links 'value' attribute must be of type number"
};
exports["default"] = _default;