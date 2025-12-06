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

  // Calculate percentage for the filled portion
  const percentage = ((value - min) / (max - min)) * 100;

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
      <div className="relative">
        {/* Background track */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 rounded-lg pointer-events-none"></div>
        {/* Filled portion */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 h-1 bg-accent-primary rounded-lg pointer-events-none transition-all"
          style={{ width: `${percentage}%` }}
        ></div>
        {/* Actual input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          className="
            relative w-full appearance-none bg-transparent cursor-pointer
            focus:outline-none focus:ring-4 focus:ring-primary-500/50 rounded-lg
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
            [&::-webkit-slider-runnable-track]:h-1
            [&::-webkit-slider-runnable-track]:bg-transparent
            [&::-moz-range-track]:h-1
            [&::-moz-range-track]:bg-transparent
          "
          {...props}
        />
      </div>
    </div>
  );
}
