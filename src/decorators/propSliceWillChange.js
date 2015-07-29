import {get as getValue} from "object-path";
import Immutable from "immutable";
import React from "react";

export default function propSliceWillChange (propKeys, fn/*, options */) {
  const {
    compareFunction,
    fireOnWillMount
  } = {
    compareFunction: Immutable.is,
    fireOnWillMount: true,
    ...arguments[2],
  };

  return DecoratedComponent =>
  class PropSliceWillChangeDecorator extends React.Component {

    static displayName = `PropSliceWillChangeDecorator(${DecoratedComponent.displayName || DecoratedComponent.name || "Component"})`;
    static DecoratedComponent = DecoratedComponent;

    componentWillMount () {
      if (fireOnWillMount) {
        fn(this.props);
      }
    }

    componentWillUpdate (nextProps) {
      const hasChanges = propKeys.some(key => {
        const value = getValue(this.props, key);
        const nextValue = getValue(nextProps, key);
        const changed = !compareFunction(value, nextValue);

        if (changed) {
          console.log(`${ key } changed from ${ value } to ${ nextValue }`);
        }
        return changed;
      });

      if (hasChanges) {
        fn(nextProps);
      }
    }

    render () {
      return (
        <DecoratedComponent {...this.props} />
      );
    }
  };
}
