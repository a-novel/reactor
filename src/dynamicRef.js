// Created and maintained by Kushuh.
// https://github.com/Kushuh - kuzanisu@gmail.com

import React from 'react';

const literals = {
	ERROR_NONVALIDREACTREF: ref => `non valid react ref : ${ref.constructor.name} is neither an object nor a function`
};

/**
 * Allow component to receive functional references from parent component.
 *
 * @param ref {{current: Node}|function(element: Node): Node}
 * @param {string} key
 * @returns {{current: Node}}
 */
function dynamicRef(ref, key) {
	if (ref == null) {
		this[key] = React.createRef();
	}

	else if (ref.constructor.name === 'Function') {
		this[key] = node => {
			ref(node);
			this[key] = {current: node};

			return node;
		}
	}

	else if (ref.constructor.name === 'Object') {
		this[key] = node => {
			ref.current = node;
			this[key] = {current: node};

			return node;
		}
	}

	else {
		throw new Error(literals.ERROR_NONVALIDREACTREF(ref));
	}
}

export default dynamicRef;
export {literals};