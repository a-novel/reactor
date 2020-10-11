import React from 'react';
import {addPropsToChildren} from '../src/index';
import {literals} from '../src/addPropsToChildren';
import {describe, it, expect} from '@jest/globals';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

class MockChildrenClass extends React.Component {
	render() {
		return null;
	}
}

const MockChildrenComponent = props => (<div {...props}/>);

const MockParent = ({children, childProps}) => addPropsToChildren(children, childProps);

describe('test addPropsToChildren', () => {
	it('should add props to component children', () => {
		const component = shallow(
			<MockParent childProps={{foo: 'bar'}}>
				<MockChildrenComponent/>
			</MockParent>
		);

		expect(component.find(MockChildrenComponent).prop('foo')).toEqual('bar');
	});

	it('should override old props', () => {
		const component = shallow(
			<MockParent childProps={{foo: 'bar'}}>
				<MockChildrenComponent foo='baz' qux='quux'/>
			</MockParent>
		);

		expect(component.find(MockChildrenComponent).prop('foo')).toEqual('bar');
		expect(component.find(MockChildrenComponent).prop('qux')).toEqual('quux');
	});

	it('should work on multiple children types', () => {
		const component = shallow(
			<MockParent childProps={{foo: 'bar'}}>
				<MockChildrenComponent foo='baz' qux='quux'/>
				hello world
				<MockChildrenComponent/>
				{42}
				{null}
				<MockChildrenClass foo='baz' qux='quux'/>
			</MockParent>
		);

		expect(component.find(MockChildrenComponent).at(0).prop('foo')).toEqual('bar');
		expect(component.find(MockChildrenComponent).at(0).prop('qux')).toEqual('quux');
		expect(component.find(MockChildrenComponent).at(1).prop('foo')).toEqual('bar');
		expect(component.find(MockChildrenComponent).at(1).prop('qux')).toBeUndefined();
		expect(component.find(MockChildrenClass).prop('foo')).toEqual('bar');
		expect(component.find(MockChildrenClass).prop('qux')).toEqual('quux');
	});

	it('should work with functional props', () => {
		let component = shallow(
			<MockParent childProps={({foo, ...props}) => ({foo: 'bar', ...props})}>
				<MockChildrenComponent foo='baz' qux='quux'/>
				hello world
				<MockChildrenClass foo='baz' qux='quux'/>
				{42}
				{null}
			</MockParent>
		);

		expect(component.find(MockChildrenComponent).prop('foo')).toEqual('bar');
		expect(component.find(MockChildrenComponent).prop('qux')).toEqual('quux');
		expect(component.find(MockChildrenClass).prop('foo')).toEqual('bar');
		expect(component.find(MockChildrenClass).prop('qux')).toEqual('quux');

		component = shallow(
			<MockParent childProps={() => ({foo: 'bar'})}>
				<MockChildrenComponent foo='baz' qux='quux'/>
				hello world
				<MockChildrenClass foo='baz' qux='quux'/>
				{42}
				{null}
			</MockParent>
		);

		expect(component.find(MockChildrenComponent).prop('foo')).toEqual('bar');
		expect(component.find(MockChildrenComponent).prop('qux')).toBeUndefined();
		expect(component.find(MockChildrenClass).prop('foo')).toEqual('bar');
		expect(component.find(MockChildrenClass).prop('qux')).toBeUndefined();
	});

	it('should work with empty values', () => {
		let component = shallow(
			<MockParent childProps={({foo, ...props}) => ({foo: 'bar', ...props})}/>
		);

		expect(component.prop('children')).toBeUndefined();

		component = shallow(
			<MockParent>
				<MockChildrenComponent foo='baz' qux='quux'/>
			</MockParent>
		);

		expect(component.find(MockChildrenComponent).prop('foo')).toEqual('baz');
		expect(component.find(MockChildrenComponent).prop('qux')).toEqual('quux');

		component = shallow(
			<MockParent childProps={() => null}>
				<MockChildrenComponent foo='baz' qux='quux'/>
			</MockParent>
		);

		expect(component.find(MockChildrenComponent).prop('foo')).toBeUndefined();
		expect(component.find(MockChildrenComponent).prop('qux')).toBeUndefined();
	});
	
	it('should throw errors with non valid parameters', () => {
		expect(() => {
			addPropsToChildren(null, 42);
		}).toThrow(literals.ERROR_NONVALIDPROP(42));

		expect(() => {
			addPropsToChildren(<MockChildrenComponent/>, () => 42);
		}).toThrow(literals.ERROR_NONVALIDPROP(42));
	});
});