import { ColorAqua500, ColorRed400, IconCheckCircle, IconWarning } from '@pop-ui/foundation';

import { toast } from '.';
import { Button } from '../Button';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Core/Toast',
  parameters: {
    docs: {
      description: {
        component: `
Toast notification component built on Pop UI notification system.

## Setup Required

Before using Toast in your app, wrap your root component with PopUiProvider:

\`\`\`tsx
import { PopUiProvider } from '@pop-ui/core';
import '@pop-ui/core/styles.css';

function App() {
  return (
    <PopUiProvider>
      <YourApp />
    </PopUiProvider>
  );
}
\`\`\`

## Provider Options

You can customize notification behavior with provider props:

\`\`\`tsx
<PopUiProvider
  notificationPosition="top-right"  // Position: top-left, top-right, top-center, bottom-left, bottom-right, bottom-center
  notificationLimit={3}              // Maximum number of visible notifications
  notificationAutoClose={4000}       // Default auto-close time in ms (or false to disable)
  notificationZIndex={1000}          // Z-index for notification container
>
  <YourApp />
</PopUiProvider>
\`\`\`

## Usage

\`\`\`tsx
import { toast } from '@pop-ui/core';

// Simple usage
toast('Operation successful');

// With options
toast({
  message: 'Operation successful',
  icon: <IconCheck />,
  autoClose: 5000, // ms, or false to disable
});
\`\`\`
        `,
      },
    },
  },
} satisfies Meta;

export default meta;

type TStory = StoryObj<typeof meta>;

export const Basic: TStory = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '20px' }}>
      <Button onClick={() => toast('This is a basic toast message')}>Show Basic Toast</Button>
    </div>
  ),
};

export const WithIcon: TStory = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '20px' }}>
      <Button
        onClick={() =>
          toast({
            message: 'Operation successful!',
            icon: <IconCheckCircle size={24} color={ColorAqua500} />,
          })
        }
      >
        Success Toast
      </Button>
      <Button
        onClick={() =>
          toast({
            message: 'Something went wrong',
            icon: <IconWarning size={22} color={ColorRed400} />,
          })
        }
      >
        Error Toast
      </Button>
    </div>
  ),
};

export const CustomDuration: TStory = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '20px' }}>
      <Button
        onClick={() =>
          toast({
            message: 'This will disappear after 1 second',
            autoClose: 1000,
          })
        }
      >
        1 Second Toast
      </Button>
      <Button
        onClick={() =>
          toast({
            message: 'This will disappear after 5 seconds',
            autoClose: 5000,
          })
        }
      >
        5 Second Toast
      </Button>
      <Button
        onClick={() =>
          toast({
            message: 'This will not disappear automatically',
            autoClose: false,
          })
        }
      >
        Persistent Toast
      </Button>
    </div>
  ),
};

export const Multiple: TStory = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '20px' }}>
      <Button
        onClick={() => {
          toast('First notification');
          setTimeout(() => toast('Second notification'), 500);
          setTimeout(() => toast('Third notification'), 1000);
        }}
      >
        Show Multiple Toasts
      </Button>
    </div>
  ),
};

export const LongMessage: TStory = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '20px' }}>
      <Button
        onClick={() =>
          toast(
            'This is a longer message to demonstrate how the toast handles multiple lines of text content',
          )
        }
      >
        Show Long Message
      </Button>
    </div>
  ),
};
