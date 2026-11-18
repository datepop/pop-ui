'use client';

import { Stepper } from '@mantine/core';
import { ColorAqua800, ColorGray300, IconChevronRight } from '@pop-ui/foundation';

import styles from './styles.module.scss';

import type { IStepNavigationProps } from './types';

export const StepNavigation = ({
  steps,
  value,
  onChange,
  ariaLabel,
  className,
}: IStepNavigationProps) => {
  const active = steps.findIndex((step) => step.value === value);

  return (
    <nav aria-label={ariaLabel} className={[styles.StepNavigation, className].filter(Boolean).join(' ')}>
      <Stepper
        active={active}
        onStepClick={(index) => {
          const next = steps[index];
          if (next && !next.disabled && next.value !== value) onChange(next.value);
        }}
        allowNextStepsSelect
        wrap={false}
        iconSize={28}
        completedIcon={({ step }) => step + 1}
        classNames={{
          steps: styles.StepNavigation__Steps,
          separator: styles.StepNavigation__Separator,
          step: styles.StepNavigation__Step,
          stepBody: styles.StepNavigation__StepBody,
          stepLabel: styles.StepNavigation__StepLabel,
          stepIcon: styles.StepNavigation__StepIcon,
          stepCompletedIcon: styles.StepNavigation__CompletedIcon,
        }}
      >
        {steps.map((step, index) => (
          <Stepper.Step
            key={step.value}
            disabled={step.disabled}
            aria-current={index === active ? 'step' : undefined}
            label={
              <>
                {step.label}
                {index < steps.length - 1 && (
                  <IconChevronRight
                    size={24}
                    color={index === active ? ColorAqua800 : ColorGray300}
                    aria-hidden="true"
                  />
                )}
              </>
            }
          />
        ))}
      </Stepper>
    </nav>
  );
};
