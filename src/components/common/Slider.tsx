import type { InputHTMLAttributes } from 'react';

export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  showValue?: boolean;
  unit?: string;
}

export default function Slider({
  label,
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  showValue = true,
  unit = '',
  className = '',
  ...props
}: SliderProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <label className="text-sm font-medium text-text-primary">
              {label}
            </label>
          )}
          {showValue && (
            <span className="text-sm text-text-secondary font-mono">
              {value}{unit}
            </span>
          )}
        </div>
      )}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="
          w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer
          focus:outline-none focus:ring-4 focus:ring-primary-500/50
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-4
          [&::-webkit-slider-thumb]:h-4
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-white
          [&::-webkit-slider-thumb]:border-2
          [&::-webkit-slider-thumb]:border-accent-primary
          [&::-webkit-slider-thumb]:cursor-pointer
          [&::-webkit-slider-thumb]:shadow-sm
          [&::-webkit-slider-thumb]:transition-all
          [&::-webkit-slider-thumb]:hover:shadow-md
          [&::-moz-range-thumb]:w-4
          [&::-moz-range-thumb]:h-4
          [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:bg-white
          [&::-moz-range-thumb]:border-2
          [&::-moz-range-thumb]:border-accent-primary
          [&::-moz-range-thumb]:cursor-pointer
          [&::-moz-range-thumb]:shadow-sm
          [&::-moz-range-thumb]:transition-all
          [&::-moz-range-thumb]:hover:shadow-md
          [&::-webkit-slider-runnable-track]:bg-accent-primary
          [&::-webkit-slider-runnable-track]:rounded-lg
          [&::-webkit-slider-runnable-track]:h-1
          [&::-moz-range-track]:bg-accent-primary
          [&::-moz-range-track]:rounded-lg
          [&::-moz-range-track]:h-1
        "
        {...props}
      />
    </div>
  );
}
