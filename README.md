# Reactor

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