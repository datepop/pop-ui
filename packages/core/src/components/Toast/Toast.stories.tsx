import {
  ColorAqua500,
  ColorRed400,
  IconCheckCircle,
  IconWarningTriangle,
} from '@pop-ui/foundation';
import { useState } from 'react';

import { toast } from '.';
import { PopUiProvider } from '../../theme';
import { Button } from '../Button';

import type { NotificationsProps } from '@mantine/notifications';
import type { Meta, StoryObj } from '@storybook/react-vite';

interface IBasicArgs {
  message: string;
  autoClose: number;
}

interface IFeedbackArgs {
  message: string;
  autoClose: number;
}

interface IPositionArgs {
  message: string;
  position: NotificationsProps['position'];
  autoClose: number;
}

const stackStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  padding: '20px',
} as const;

const meta = {
  title: 'Core/Toast',
  parameters: {
    docs: {
      description: {
        component: [
          'Toast notification runtime built on the Pop UI provider-backed notification system.',
          '',
          '## Setup Required',
          '',
          'The exported `toast(input)`, `toast.update(id, input)`, `toast.hide(id)`, and `toast.clean()` functions depend on `PopUiProvider` mounting the notification runtime.',
          '',
          'Before calling toast in your app, wrap your root component with PopUiProvider:',
          '',
          '```tsx',
          "import { PopUiProvider } from '@pop-ui/core';",
          "import '@pop-ui/core/styles.css';",
          '',
          'function App() {',
          '  return (',
          '    <PopUiProvider>',
          '      <YourApp />',
          '    </PopUiProvider>',
          '  );',
          '}',
          '```',
          '',
          '## Provider Options',
          '',
          'You can customize notification behavior with provider props:',
          '',
          '```tsx',
          '<PopUiProvider',
          '  notificationPosition="top-right"',
          '  notificationLimit={3}',
          '  notificationAutoClose={4000}',
          '  notificationZIndex={1000}',
          '>',
          '  <YourApp />',
          '</PopUiProvider>',
          '```',
          '',
          '## Usage',
          '',
          '```tsx',
          "import { toast } from '@pop-ui/core';",
          '',
          "toast('Operation successful');",
          '',
          'toast({',
          "  message: 'Operation successful',",
          '  icon: <IconCheck />,',
          '  autoClose: 5000,',
          '});',
          '',
          "toast.update('save-toast', { message: 'Saved!' });",
          "toast.hide('save-toast');",
          'toast.clean();',
          '```',
        ].join('\n'),
      },
    },
  },
} satisfies Meta;

export default meta;

export const Basic: StoryObj = {
  parameters: {
    docs: {
      description: {
        story:
          'Object payload으로 기본 토스트를 표시합니다. 이 스토리는 전역 Storybook `PopUiProvider` 경계에서 실행됩니다.',
      },
    },
  },
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
      <div style={stackStyle}>
        <Button
          onClick={() =>
            toast({
              message: typedArgs.message,
              autoClose: typedArgs.autoClose === 0 ? false : typedArgs.autoClose,
            })
          }
        >
          Show Basic Toast
        </Button>
      </div>
    );
  },
};

export const Default: StoryObj = {
  parameters: {
    docs: {
      description: {
        story:
          '문자열 payload를 전달하면 동일한 canonical 메시지 컨테이너로 렌더링됩니다. 이 호출도 `PopUiProvider`가 필요합니다.',
      },
    },
  },
  args: {
    message: 'String payload uses the default toast contract',
  },
  argTypes: {
    message: {
      control: 'text',
      description: 'String-based toast message',
    },
  },
  render: (args) => {
    const typedArgs = args as Pick<IBasicArgs, 'message'>;

    return (
      <div style={stackStyle}>
        <Button onClick={() => toast(typedArgs.message)}>Show Default Toast</Button>
      </div>
    );
  },
};

export const Success: StoryObj = {
  parameters: {
    docs: {
      description: {
        story: '성공 상태는 object payload와 icon을 함께 사용한 provider-backed 토스트 예시입니다.',
      },
    },
  },
  args: {
    message: 'Operation successful',
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
    const typedArgs = args as IFeedbackArgs;

    return (
      <div style={stackStyle}>
        <Button
          onClick={() =>
            toast({
              message: typedArgs.message,
              icon: <IconCheckCircle size={24} color={ColorAqua500} />,
              autoClose: typedArgs.autoClose === 0 ? false : typedArgs.autoClose,
            })
          }
        >
          Show Success Toast
        </Button>
      </div>
    );
  },
};

export const Error: StoryObj = {
  parameters: {
    docs: {
      description: {
        story: '에러 상태도 같은 toast contract를 사용하고, 차이는 icon/message payload뿐입니다.',
      },
    },
  },
  args: {
    message: 'Something went wrong',
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
    const typedArgs = args as IFeedbackArgs;

    return (
      <div style={stackStyle}>
        <Button
          onClick={() =>
            toast({
              message: typedArgs.message,
              icon: <IconWarningTriangle size={22} color={ColorRed400} />,
              autoClose: typedArgs.autoClose === 0 ? false : typedArgs.autoClose,
            })
          }
        >
          Show Error Toast
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
    docs: {
      description: {
        story:
          '이 스토리는 provider dependency를 드러내기 위해 자체 `PopUiProvider`를 렌더링합니다.',
      },
    },
  },
  render: (args) => {
    const typedArgs = args as IPositionArgs;
    return (
      <PopUiProvider notificationPosition={typedArgs.position}>
        <div style={stackStyle}>
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
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
      if (isSaving) {
        return;
      }

      setIsSaving(true);
      toast({
        id: 'save-progress',
        message: '저장 중...',
        autoClose: false,
      });

      window.setTimeout(() => {
        toast.update('save-progress', {
          message: '저장 완료!',
          icon: <IconCheckCircle size={24} color={ColorAqua500} />,
          autoClose: 3000,
        });
        setIsSaving(false);
      }, 2000);
    };

    return (
      <div style={stackStyle}>
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
    <div style={stackStyle}>
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
