import React from "react";
// Function to insert component into the first element of children
export function injectElementIntoFirstChild(children: React.ReactNode, component: React.ReactNode): React.ReactNode {
  // If only one element, add a component at the beginning
  if (React.isValidElement(children)) {
    return React.cloneElement(
      children as React.ReactElement,
      {
        children: React.createElement(React.Fragment, {}, component, (children as any).props.children)
      } as any
    );
  }

  // If children is an array, add a component to the first element
  if (Array.isArray(children)) {
    const [firstChild, ...rest] = children as React.ReactElement[];
    if (React.isValidElement(firstChild as React.ReactElement)) {
      return [
        React.cloneElement(
          firstChild as React.ReactElement,
          {
            children: React.createElement(
              React.Fragment,
              {},

              component,
              (firstChild as any).props?.children /* Access props safely */
            )
          } as any
        ),
        ...rest
      ];
    }
  }

  return children; // If invalid, return children as is
}
