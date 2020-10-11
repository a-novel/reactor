// Created and maintained by Kushuh - kuzanisu@gmail.com.
// https://github.com/Kushuh

import React from 'react';

const literals = {
	ERROR_NONVALIDPROP: value => `non valid properties : expected Object, got ${value.constructor.name}.`
};

/**
 * Replace props of a React children.
 *
 * @param {Object|function:(Object, number)} props - new props to add
 * @param {React.Component|function} child - children to alter
 * @param {number} index - tells prop function which child is modified
 * @return *
 */
const alterChild = (props, child, index) => {
	// Null is valid Element, but we don't want it as it doesn't hold props.
	if (child != null && React.isValidElement(child)) {
		// Remove all props from original child and copy the rest (React elements are built from Objects, like all
		// js types except null). Removing old props now allows to filter them in a Props Function.
		const {props: childProps, ...childParams} = child;

		// Build new props on top of the old ones.
		const newProps = typeof props === 'function' ?
			props(childProps, index) :
			Object.assign({...childProps}, {...props});

		// Since user can return anything from Props Function, we ensure it returns a valid default Object.
		if (newProps != null && newProps.constructor !== Object) {
			throw new Error(literals.ERROR_NONVALIDPROP(newProps))
		}

		return React.cloneElement({...childParams, props: {}}, newProps);
	} else {
		// Non React Element Nodes don't hold any prop, so their is no need to alter them.
		return child;
	}
};

/**
 * Add properties to a list of React children.
 *
 * @param children
 * @param props
 * @return {Array<Exclude<*, boolean | null | undefined>>|null|*}
 */
const addPropsToChildren = (children, props) => {
	if (props == null) {
		return children;
	} else if (props.constructor !== Object && props.constructor !== Function) {
		throw new Error(literals.ERROR_NONVALIDPROP(props));
	}

	// Convert undefined or other null types to null, since it is the only one accepted by React as Child.
	if (children == null) {
		return null;
	} else if (children.constructor === Array) {
		return React.Children.map(
			children,
			(child, index) => alterChild(props, child, index)
		);
	} else {
		return alterChild(props, children, 0);
	}
};

export default addPropsToChildren;
export {literals};