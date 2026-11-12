export interface IStepNavigationStep {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface IStepNavigationProps {
  steps: readonly IStepNavigationStep[];
  value: string;
  onChange: (value: string) => void;
  ariaLabel: string;
  className?: string;
}
