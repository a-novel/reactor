import React from 'react';
import {
	MockParentClassWithStaticRef,
	MockParentClassWithDynamicRef,
	MockParentClassWithNonValidRef,
	MockChildrenClass
} from './dynamicRef.mocks';
import {describe, it, expect, jest} from '@jest/globals';
import {mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {literals} from '../src/dynamicRef';

configure({ adapter: new Adapter() });

describe('test dynamicRef', () => {
	it('should work with no parent ref', () => {
		const component = mount(<MockChildrenClass/>);

		expect(component.instance().divRef).toBeDefined();
		expect(component.instance().divRef.current).toBeDefined();
		expect(component.instance().divRef.current.outerHTML).toEqual('<div>hello world</div>');
	});

	it('should work with static parent ref', () => {
		const component = mount(<MockParentClassWithStaticRef/>);

		expect(component.find(MockChildrenClass).instance().divRef).toBeDefined();
		expect(component.find(MockChildrenClass).instance().divRef.current).toBeDefined();
		expect(component.find(MockChildrenClass).instance().divRef.current.outerHTML).toEqual('<div>hello world</div>');

		expect(component.instance().divRef).toBeDefined();
		expect(component.instance().divRef.current).toBeDefined();
		expect(component.instance().divRef.current.outerHTML).toEqual('<div>hello world</div>');
	});

	it('should work with dynamic parent ref', () => {
		const component = mount(<MockParentClassWithDynamicRef/>);

		expect(component.find(MockChildrenClass).instance().divRef).toBeDefined();
		expect(component.find(MockChildrenClass).instance().divRef.current).toBeDefined();
		expect(component.find(MockChildrenClass).instance().divRef.current.outerHTML).toEqual('<div>hello world</div>');

		expect(component.instance().divRef).toBeDefined();
		expect(component.instance().divRef.current).toBeDefined();
		expect(component.instance().divRef.current.outerHTML).toEqual('<div>hello world</div>');
	});

	it('should reject with non valid ref', () => {
		const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
		const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

		expect(() => {
			mount(<MockParentClassWithNonValidRef/>);
		}).toThrow(literals.ERROR_NONVALIDREACTREF(42));

		consoleSpy.mockRestore();
		consoleErrorSpy.mockRestore();
	});
});