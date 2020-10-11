import React from 'react';
import {dynamicRef} from '../src';

class MockChildrenClass extends React.Component {
	constructor(props) {
		super(props);

		dynamicRef.bind(this)(props.innerRef, 'divRef');
	}

	render() {
		return (
			<div ref={this.divRef}>hello world</div>
		);
	}
}

class MockParentClassWithStaticRef extends React.Component {
	constructor(props) {
		super(props);
		this.divRef = React.createRef();
	}

	render() {
		return (
			<MockChildrenClass innerRef={this.divRef}/>
		);
	}
}

class MockParentClassWithDynamicRef extends React.Component {
	constructor(props) {
		super(props);
		this.divRef = React.createRef();
	}

	render() {
		return (
			<MockChildrenClass innerRef={node => this.divRef.current = node}/>
		);
	}
}

class MockParentClassWithNonValidRef extends React.Component {
	constructor(props) {
		super(props);
		this.divRef = 42;
	}

	render() {
		return (
			<MockChildrenClass innerRef={this.divRef}/>
		);
	}
}

export {MockParentClassWithStaticRef, MockParentClassWithDynamicRef, MockParentClassWithNonValidRef, MockChildrenClass};