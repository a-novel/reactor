# Reactor

<div align="center">
    <a href="https://www.npmjs.com/package/@anovel/reactor">
        <img alt="npm (scoped)" src="https://img.shields.io/npm/v/@anovel/reactor?style=for-the-badge">
    </a>
    <a href="https://github.com/a-novel/reactor/blob/master/LICENSE">    
        <img alt="GitHub" src="https://img.shields.io/github/license/a-novel/reactor?style=for-the-badge">
    </a>
</div>

<div align="center">
    <a href="https://codecov.io/gh/a-novel/reactor">
        <img alt="Codecov" src="https://img.shields.io/codecov/c/github/a-novel/reactor?style=flat-square">
    </a>
    <img alt="David" src="https://img.shields.io/david/dev/a-novel/reactor?style=flat-square">
    <img alt="npm bundle size (scoped)" src="https://img.shields.io/bundlephobia/min/@anovel/reactor?style=flat-square">
</div>
<br/>

React tools for more dynamic components.

- [addPropsToChildren](#addpropstochildren)
- [dynamicRef](#dynamicref)

## addPropsToChildren

Programmatically add properties to React children components in props.

```jsx
import React from 'react';
import {addPropsToChildren} from '@anovel/reactor';

const MyComponent = ({children, ...props}) => (
  <div>
    {addPropsToChildren(children, {foo: 'bar'})}
  </div>
);
```

```jsx
import React from 'react';

const MyParentComponent = () => (
  <MyComponent>
    <MyChildrenComponent/>
  </MyComponent>
);

const MyChildrenComponent = ({foo}) => {
  console.log(foo); // logs bar.
  // ...
};
```

Props added with addPropsToChildren will override previously set props in case of
conflict. So :

```jsx
import React from 'react';

const MyParentComponent = () => (
  <MyComponent>
    <MyChildrenComponent foo={'something'}/>
  </MyComponent>
);

const MyChildrenComponent = ({foo}) => {
  console.log(foo); // logs bar because <MyComponent> overrides foo property.
  // ...
};
```

You can also pass a function to compute properties.

```jsx
import React from 'react';
import {addPropsToChildren} from '@anovel/reactor';

const MyComponent = ({children, ...props}) => (
  <div>
    {addPropsToChildren(children, props => {
      if (props.foo == null) {
        // Replace only if not set.
        props.foo = 'bar';
      }

      return props;
    })}
  </div>
);
```

## dynamicRef

Allow components with `forwardRef` export to accept functional references.

```jsx
import React from 'react';
import {dynamicRef} from '@anovel/reactor';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    // Get the ref from props.innerRef and assign it to this.divRef.
    // If no ref was send from parent, create a local reference.
    dynamicRef.bind(this)(this.props.innerRef, 'divRef');
  }

  render(){
    return (
      <div ref={this.divRef}>
      
      </div>
    );
  }
}
```

# License

[Licensed under MIT for A-Novel](https://github.com/a-novel/reactor/blob/master/LICENSE).