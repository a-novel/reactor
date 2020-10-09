// Created and maintained by Kushuh.
// https://github.com/Kushuh - kuzanisu@gmail.com

import React from 'react';

/**
 * Allow component to receive functional references from parent component.
 *
 * @param ref {{current: Node}|function(element: Node): Node}
 * @returns {{current: Node}}
 */
const dynamicRef = ref => ref == null || typeof ref === 'function' ? React.createRef() : ref;

export default dynamicRef;