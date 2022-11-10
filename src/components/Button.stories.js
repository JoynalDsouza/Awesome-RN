import React from 'react';

import Button from './Button';

export default {
  title: 'components/Button',
  component: Button,
  decorators: [
    Story => (
      <div style={{margin: '3em'}}>
        <Story />
      </div>
    ),
  ],
};

export const Basic = () => <Button label="Click Me" backgroundColor="purple" />;
export const redButton = () => (
  <Button label="Click Me" backgroundColor="red" />
);
export const blueButton = () => (
  <Button label="Click Me" backgroundColor="blue" />
);
