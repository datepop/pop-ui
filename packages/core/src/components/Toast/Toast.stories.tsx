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

export const DuplicatePrevention: StoryObj = {
  parameters: {
    docs: {
      description: {
        story: `
id를 사용하면 동일한 id로 호출된 토스트는 새로 생성되지 않고 기존 토스트가 업데이트됩니다.
이를 통해 중복된 알림을 방지하고 UX를 개선할 수 있습니다.

- "같은 ID 토스트" 버튼: 여러 번 클릭해도 토스트가 1개만 표시됩니다
- "일반 토스트" 버튼: 클릭할 때마다 새로운 토스트가 생성됩니다
        `,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '20px' }}>
      <Button
        onClick={() =>
          toast({
            id: 'duplicate-prevention-demo',
            message: '같은 ID로 호출된 토스트입니다',
            autoClose: false,
          })
        }
      >
        같은 ID 토스트 (중복 방지)
      </Button>
      <Button onClick={() => toast({ message: 'ID가 없는 일반 토스트입니다', autoClose: false })}>
        일반 토스트 (매번 새로 생성)
      </Button>
    </div>
  ),
};

export const UpdateToast: StoryObj = {
  parameters: {
    docs: {
      description: {
        story: `
toast.update()를 사용하여 기존 토스트의 내용을 업데이트할 수 있습니다.
비동기 작업의 진행 상태를 표시할 때 유용합니다.

버튼을 클릭하면:
1. "저장 중..." 토스트가 표시됩니다
2. 2초 후 같은 토스트가 "저장 완료!"로 업데이트됩니다
        `,
      },
    },
  },
  render: () => {
    const handleSave = () => {
      toast({
        id: 'save-progress',
        message: '저장 중...',
        autoClose: false,
      });

      setTimeout(() => {
        toast.update('save-progress', {
          message: '저장 완료!',
          icon: <IconCheckCircle size={24} color={ColorAqua500} />,
          autoClose: 3000,
        });
      }, 2000);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '20px' }}>
        <Button onClick={handleSave}>저장 시뮬레이션 (진행 상태 업데이트)</Button>
      </div>
    );
  },
};

export const ManualControl: StoryObj = {
  parameters: {
    docs: {
      description: {
        story: `
toast.hide()와 toast.clean()을 사용하여 토스트를 수동으로 제어할 수 있습니다.

- toast.hide(id): 특정 id의 토스트를 닫습니다
- toast.clean(): 모든 토스트를 제거합니다
        `,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '20px' }}>
      <Button
        onClick={() =>
          toast({
            id: 'controlled-toast-1',
            message: '제어 가능한 토스트 #1',
            autoClose: false,
          })
        }
      >
        토스트 #1 표시
      </Button>
      <Button
        onClick={() =>
          toast({
            id: 'controlled-toast-2',
            message: '제어 가능한 토스트 #2',
            autoClose: false,
          })
        }
      >
        토스트 #2 표시
      </Button>
      <Button onClick={() => toast.hide('controlled-toast-1')}>토스트 #1 닫기</Button>
      <Button onClick={() => toast.clean()}>모든 토스트 제거</Button>
    </div>
  ),
};

