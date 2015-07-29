import shallowEqualImmutable from "react-immutable-render-mixin/shallowEqualImmutable";
import warning from "warning";

export default function shouldImmutableComponentUpdate(nextProps, nextState) {
  const shouldUpdate = !shallowEqualImmutable(this.props, nextProps) ||
         !shallowEqualImmutable(this.state, nextState);

  warning(!shouldUpdate, `${this.constructor.name}#shouldImmutableComponentUpdate fails to shortcut the changes.`);

  return shouldUpdate;
}
