import { ComponentClass, ComponentType } from "react";

/**
 * Set {@link ComponentClass#defaultProps} of provided component.
 * Useful for configuring default props of the functional components, since typescript does not allow to do that easily.
 * @param component - component whose default props to set.
 * @param defaultProps - default props to set for the component.
 */
export function setDefaultProps<P>(component: ComponentType<P>, defaultProps: Partial<P>) {
  component.defaultProps = defaultProps;
}
