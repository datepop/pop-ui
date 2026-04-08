import React, { act } from 'react';
import { createRoot } from 'react-dom/client';

const { MockInput, mockInput, mockTextarea, mockTooltip } = vi.hoisted(() => {
  const tooltip = vi.fn(
    ({
      children,
      label,
      position,
    }: {
      children: React.ReactNode;
      label: string;
      position: string;
    }) => (
      <div data-label={label} data-position={position} data-testid="tooltip">
        {children}
      </div>
    ),
  );

  const inputSpy = vi.fn(
    ({
      className,
      error,
      onChange,
      rightSection,
      ...props
    }: React.InputHTMLAttributes<HTMLInputElement> & {
      error?: string;
      rightSection?: React.ReactNode;
    }) => (
      <div className={className} data-error={error} data-testid="input-root">
        <input data-testid="input-element" onChange={onChange} {...props} />
        {rightSection}
      </div>
    ),
  );

  const input = (
    props: React.InputHTMLAttributes<HTMLInputElement> & {
      error?: string;
      rightSection?: React.ReactNode;
    },
  ) => inputSpy(props);

  function InputLabel({
    children,
    className,
    required,
  }: {
    children: React.ReactNode;
    className?: string;
    required?: boolean;
  }) {
    return (
      <label
        className={className}
        data-required={String(Boolean(required))}
        data-testid="input-label"
      >
        {children}
      </label>
    );
  }
  input.Label = InputLabel;

  function InputDescription({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) {
    return (
      <div className={className} data-testid="input-description">
        {children}
      </div>
    );
  }
  input.Description = InputDescription;

  function InputError({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
      <div className={className} data-testid="input-error">
        {children}
      </div>
    );
  }
  input.Error = InputError;

  const textarea = vi.fn(
    ({
      className,
      error,
      minRows,
      onChange,
      ...props
    }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
      error?: string;
      minRows?: number;
    }) => (
      <div className={className} data-error={error} data-testid="textarea-root">
        <textarea
          data-min-rows={String(minRows ?? '')}
          data-testid="textarea-element"
          onChange={onChange}
          {...props}
        />
      </div>
    ),
  );

  return {
    MockInput: input,
    mockInput: inputSpy,
    mockTextarea: textarea,
    mockTooltip: tooltip,
  };
});

vi.mock('@mantine/core', () => ({
  Input: Object.assign(MockInput, {
    Label: MockInput.Label,
    Description: MockInput.Description,
    Error: MockInput.Error,
  }),
  Textarea: (
    props: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: string; minRows?: number },
  ) => mockTextarea(props),
  Tooltip: (props: { children: React.ReactNode; label: string; position: string }) =>
    mockTooltip(props),
}));

vi.mock('@pop-ui/foundation', () => ({
  IconInfoCircle: ({ size }: { size: number }) => (
    <div data-size={String(size)} data-testid="icon-info" />
  ),
  IconX: ({ size }: { size: number }) => <div data-size={String(size)} data-testid="icon-x" />,
}));

import { TextField } from '.';

import type { Root } from 'react-dom/client';

interface IRenderedApp {
  container: HTMLDivElement;
  root: Root;
}

(
  globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

const renderApp = (ui: React.ReactNode): IRenderedApp => {
  const container = document.createElement('div');
  document.body.appendChild(container);

  const root = createRoot(container);

  act(() => {
    root.render(ui);
  });

  return { container, root };
};

const cleanupRenderedApp = ({ container, root }: IRenderedApp): void => {
  act(() => {
    root.unmount();
  });

  container.remove();
};

describe('TextField', () => {
  afterEach(() => {
    mockInput.mockClear();
    mockTextarea.mockClear();
    mockTooltip.mockClear();
    document.body.innerHTML = '';
  });

  it('renders label, tooltip, description, and error content on the input branch', () => {
    const view = renderApp(
      <TextField
        label="Email"
        tooltip="tooltip text"
        tooltipPosition="right"
        description="description text"
        errorMsg="error text"
        required
      />,
    );

    expect(view.container.querySelector('[data-testid="input-label"]')).toHaveTextContent('Email');
    expect(view.container.querySelector('[data-testid="input-label"]')).toHaveAttribute(
      'data-required',
      'true',
    );
    expect(view.container.querySelector('[data-testid="tooltip"]')).toHaveAttribute(
      'data-label',
      'tooltip text',
    );
    expect(view.container.querySelector('[data-testid="tooltip"]')).toHaveAttribute(
      'data-position',
      'right',
    );
    expect(view.container.querySelector('[data-testid="input-description"]')).toHaveTextContent(
      'description text',
    );
    expect(view.container.querySelector('[data-testid="input-error"]')).toHaveTextContent(
      'error text',
    );
    expect(view.container.querySelector('[data-testid="icon-info"]')).toHaveAttribute(
      'data-size',
      '16',
    );

    cleanupRenderedApp(view);
  });

  it('calls onChange once within the limit and blocks updates beyond maxTextCount', () => {
    const handleChange = vi.fn();
    const view = renderApp(<TextField maxTextCount={5} onChange={handleChange} />);
    const inputProps = mockInput.mock.calls[0]?.[0];

    act(() => {
      inputProps?.onChange?.({
        currentTarget: { value: 'abcd' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(view.container).toHaveTextContent('4/5');

    act(() => {
      inputProps?.onChange?.({
        currentTarget: { value: 'abcdef' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(view.container).toHaveTextContent('4/5');

    cleanupRenderedApp(view);
  });

  it('shows the clear affordance for an initial controlled value and keeps it in sync', () => {
    const ControlledField = () => {
      const [value, setValue] = React.useState('seed');

      return (
        <TextField
          maxTextCount={10}
          onClear={() => setValue('')}
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
        />
      );
    };

    const view = renderApp(<ControlledField />);
    let clearButton = view.container.querySelector('[data-testid="icon-x"]')?.parentElement;

    expect(clearButton).not.toBeNull();
    expect(view.container).toHaveTextContent('4/10');

    act(() => {
      const inputProps = mockInput.mock.calls.at(-1)?.[0];
      inputProps?.onChange?.({
        currentTarget: { value: 'seed!' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    clearButton = view.container.querySelector('[data-testid="icon-x"]')?.parentElement;

    expect(clearButton).not.toBeNull();
    expect(view.container.querySelector('[data-testid="icon-x"]')).toHaveAttribute(
      'data-size',
      '20',
    );

    act(() => {
      clearButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(view.container.querySelector('[data-testid="icon-x"]')).toBeNull();
    expect(view.container).toHaveTextContent('0/10');

    cleanupRenderedApp(view);
  });

  it('keeps the counter in sync with controlled values across rerenders', () => {
    const ControlledField = ({ value }: { value: string }) => (
      <TextField maxTextCount={10} value={value} onChange={vi.fn()} />
    );

    const view = renderApp(<ControlledField value="seed" />);

    expect(view.container).toHaveTextContent('4/10');

    act(() => {
      view.root.render(<ControlledField value="updated" />);
    });

    expect(view.container).toHaveTextContent('7/10');

    cleanupRenderedApp(view);
  });

  it('switches to the textarea branch and forwards minRows, disabled state, and errors', () => {
    const view = renderApp(
      <TextField textarea minRows={4} disabled errorMsg="textarea error" size="lg" />,
    );

    expect(view.container.querySelector('[data-testid="input-element"]')).toBeNull();
    expect(view.container.querySelector('[data-testid="textarea-root"]')).toHaveAttribute(
      'data-error',
      'textarea error',
    );
    expect(mockTextarea).toHaveBeenCalledTimes(1);

    const props = mockTextarea.mock.calls[0]?.[0];
    expect(props.minRows).toBe(4);
    expect(props.disabled).toBe(true);

    cleanupRenderedApp(view);
  });
});
