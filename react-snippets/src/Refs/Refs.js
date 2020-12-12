import React, { useRef, useEffect, useImperativeHandle } from "react";

export function CustomButton() {
  const buttonRef = useRef();

  useEffect(() => {
    buttonRef.current.click();
  }, []);

  const handleClick = () => {
    console.log("Custom Button Clicked");
  };

  return (
    <div>
      <button ref={buttonRef} onClick={handleClick}>
        Click Me
      </button>
    </div>
  );
}

const Child = React.forwardRef((props, ref) => {
  const handleClick = () => {
    console.log("Child Button Clicked");
  };

  return (
    <div>
      <button ref={ref} onClick={handleClick}>
        Click Me
      </button>
    </div>
  );
});

const withLog = (Component) => {
  const WithLog = ({ componentRef, ...rest }) => {
    useEffect(() => {
      console.log('Logger mounted');
    }, []);
    return <Component ref={componentRef} {...rest} />;
  };

  return React.forwardRef((props, ref) => {
    return <WithLog componentRef={ref} />;
  });
};
const ChildWithLog = withLog(Child);

const ChildRef = React.forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    click: () => {
      console.log("Child function called from Parent");
    },
  }));

  return <div>Child Component</div>;
});

function Parent() {
  const childButtonRef = useRef();
  const childWithLogButtonRef = useRef();
  const childRef = useRef();

  useEffect(() => {
    childButtonRef.current.click();
    childWithLogButtonRef.current.click();
    childRef.current.click();
  }, []);

  return (
    <div>
      <Child ref={childButtonRef} />
      <ChildWithLog ref={childWithLogButtonRef} />
      <ChildRef ref={childRef} />
    </div>
  );
}

export default function RefExamples() {
  return (
    <div>
      <header>Simple Ref</header>
      <CustomButton />
      <header>Forwarding Ref</header>
      <Parent />
    </div>
  );
}
