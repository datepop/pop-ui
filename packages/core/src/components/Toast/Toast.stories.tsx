import { ColorAqua500, ColorRed400, IconCheckCircle, IconWarning } from '@pop-ui/foundation';

import { toast } from '.';
import { PopUiProvider } from '../../theme';
import { Button } from '../Button';

import type { NotificationsProps } from '@mantine/notifications';
import type { Meta, StoryObj } from '@storybook/react-vite';

interface IBasicArgs {
  message: string;
  autoClose: number;
}

interface IWithIconArgs {
  message: string;
  iconType: 'none' | 'success' | 'error';
  autoClose: number;
}

interface IPositionArgs {
  message: string;
  position: NotificationsProps['position'];
  autoClose: number;
}

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
  autoClose: 5000, // ms, or false to disable (use 0 in controls)
});
\`\`\`
        `,
      },
    },
  },
} satisfies Meta;

export default meta;

export const Basic: StoryObj = {
  args: {
    message: 'This is a basic toast message',
    autoClose: 4000,
  },
  argTypes: {
    message: {
      control: 'text',
      description: 'Toast message content',
    },
    autoClose: {
      control: { type: 'range', min: 0, max: 10000, step: 500 },
      description: 'Auto close time in ms (0 = never close)',
    },
  },
  render: (args) => {
    const typedArgs = args as IBasicArgs;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '20px' }}>
        <Button
          onClick={() =>
            toast({
              message: typedArgs.message,
              autoClose: typedArgs.autoClose === 0 ? false : typedArgs.autoClose,
            })
          }
        >
          Show Toast
        </Button>
      </div>
    );
  },
};

export const WithIcon: StoryObj = {
  args: {
    message: 'Operation successful',
    iconType: 'success',
    autoClose: 4000,
  },
  argTypes: {
    message: {
      control: 'text',
      description: 'Toast message content',
    },
    iconType: {
      control: 'select',
      options: ['none', 'success', 'error'],
      description: 'Icon type to display',
    },
    autoClose: {
      control: { type: 'range', min: 0, max: 10000, step: 500 },
      description: 'Auto close time in ms (0 = never close)',
    },
  },
  render: (args) => {
    const typedArgs = args as IWithIconArgs;
    const getIcon = () => {
      switch (typedArgs.iconType) {
        case 'success':
          return <IconCheckCircle size={24} color={ColorAqua500} />;
        case 'error':
          return <IconWarning size={22} color={ColorRed400} />;
        default:
          return undefined;
      }
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '20px' }}>
        <Button
          onClick={() =>
            toast({
              message: typedArgs.message,
              icon: getIcon(),
              autoClose: typedArgs.autoClose === 0 ? false : typedArgs.autoClose,
            })
          }
        >
          Show Toast
        </Button>
      </div>
    );
  },
};

export const Position: StoryObj = {
  args: {
    message: 'This toast appears at selected position',
    position: 'bottom-center',
    autoClose: 4000,
  },
  argTypes: {
    message: {
      control: 'text',
      description: 'Toast message content',
    },
    position: {
      control: 'select',
      options: [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ],
      description: 'Toast position on screen',
    },
    autoClose: {
      control: { type: 'range', min: 0, max: 10000, step: 500 },
      description: 'Auto close time in ms (0 = never close)',
    },
  },
  parameters: {
    disablePopUiProvider: true,
  },
  render: (args) => {
    const typedArgs = args as IPositionArgs;
    return (
      <PopUiProvider notificationPosition={typedArgs.position}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '20px' }}>
          <Button
            onClick={() =>
              toast({
                message: typedArgs.message,
                autoClose: typedArgs.autoClose === 0 ? false : typedArgs.autoClose,
              })
            }
          >
            Show Toast
          </Button>
        </div>
      </PopUiProvider>
    );
  },
};
