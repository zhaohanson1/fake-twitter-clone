import * as React from 'react';

interface myInterface {
  name: string;
}

const MyHeader: React.FunctionComponent<myInterface> = (props: myInterface) => (
  <h1>Hola, {props.name}! </h1>
);

export default MyHeader;
