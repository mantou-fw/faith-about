// Compatibility exports for recovered Echo components; one shared React instance.
import React from 'react';
import * as ReactNamespace from 'react';
const namespace = { ...ReactNamespace, default: React };
const requireReact = () => React;
const getDefault = (module) => module?.__esModule ? module.default : module;
export { React as R, namespace as a, requireReact as b, getDefault as g, React as r };
